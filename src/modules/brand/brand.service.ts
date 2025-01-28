import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { UploadService } from '../upload';

@Injectable()
export class BrandService {

  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    private uploadService: UploadService
  ) { }

  async create(create: CreateBrandDto) {

    const uploadImage = this.uploadService.uploadFile({
      file: create.image,
      destination: "uploads/brands"
    })

    const conflictColor = await this.brandRepository.findOneBy({
      name: create.name
    });
    if (conflictColor) {
      throw new ConflictException('Brand name already exists❗');
    }
    const newBrand = this.brandRepository.create({
      name: create.name,
      image: (await uploadImage).imageUrl
    });

    await this.brandRepository.save(newBrand);

    return newBrand
  }

  async findAll() {
    return await this.brandRepository.find({
      relations: ["products"]
    });
  }

  async findOne(id: number) {
    const findBrand = await this.brandRepository.findOne({ where: { id } });
    if (!findBrand) {
      throw new NotFoundException('Brand not found❗');
    }
    return findBrand
  }

  async update(id: number, update: UpdateBrandDto) {
    const [findBrand, conflictUser] = await Promise.all([
      this.brandRepository.findOne({ where: { id } }),
      this.brandRepository.findOneBy({ name: update.name }),
    ]);

    if (!findBrand) {
      throw new NotFoundException('Brand not found❗');
    }
    if (conflictUser) {
      throw new ConflictException('Brand name already exists❗');
    }

    if (findBrand.image) {
      await this.uploadService.removeFile({ fileName: findBrand.image });
    }
    const uploadImage = await this.uploadService.uploadFile({
      file: update.image,
      destination: "uploads/brands"
    })

    return await this.brandRepository.update({ id }, {
      image: uploadImage.imageUrl,
      name: update.name
    });
  }

  async remove(id: number) {
    const findBrand = await this.brandRepository.findOne({ where: { id } });
    if (!findBrand) {
      throw new NotFoundException('Brand not found❗');
    }
    await this.uploadService.removeFile({ fileName: findBrand.image });
    return this.brandRepository.delete({ id });
  }
}
