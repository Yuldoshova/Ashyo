import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entities';
import { Repository } from 'typeorm';
import { UpdateCategory } from './dto/update-category.dto.js';
import { CreateCategoryDto } from './dto/create-category.dto.ts';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { UploadService } from '../upload';
import { BrandService } from '../brand/brand.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private uploadService: UploadService,
    private brandService: BrandService,
  ) { }

  async createCategory(create: CreateCategoryDto, image: Express.Multer.File, icon: Express.Multer.File) {
    const uploadImage = await this.uploadService.uploadFile({
      file: image,
      destination: "uploads/categories/images"
    })

    const uploadIcon = await this.uploadService.uploadFile({
      file: icon,
      destination: "uploads/categories/icons"
    })

    const existingCategory = await this.categoryRepository.findOne({
      where: { name: create.name },
    });

    if (existingCategory) {
      throw new ConflictException('Category with this name already exists❗');
    }


    const findBrand = await this.brandService.findOne(create.brend_id)
    const findCategory = await this.categoryRepository.findOne({ where: { id: create.parent_id } })

    const newCategory = this.categoryRepository.create({
      name: create.name,
      image: uploadImage.imageUrl,
      icon: uploadIcon.imageUrl,
      brand: findBrand,
      parent: findCategory
    });

    await this.categoryRepository.save(newCategory);

    return {
      message: 'Success✅',
      data: newCategory,
    };
  }

  async findAll() {
    const categories = await this.categoryRepository.find({ relations: ["children", "products"] });
    return {
      message: 'Success✅',
      data: categories,
    };
  }

  async findOne(id: number) {
    const findCategory = await this.categoryRepository.findOne({
      where: { id },
    });

    return findCategory
  }

  async update(id: number, update: UpdateCategory, image, icon) {
    const existingCategory = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!existingCategory) {
      throw new NotFoundException('Category not found❗');
    }

    if (update.name && update.name !== existingCategory.name) {
      const duplicateCategory = await this.categoryRepository.findOne({
        where: { name: update.name },
      });

      if (duplicateCategory) {
        throw new ConflictException('Category with this name already exists❗');
      }
    }

    const uploadImage = await this.uploadService.uploadFile({
      file: image,
      destination: "uploads/categories/images"
    })

    const uploadIcon = await this.uploadService.uploadFile({
      file: icon,
      destination: "uploads/categories/icons"
    })

    await this.categoryRepository.update({ id }, { image: uploadImage.imageUrl, icon: uploadIcon.imageUrl, name: update.name });

    const updatedCategory = await this.categoryRepository.findOne({
      where: { id },
    });

    return {
      message: 'Success✅',
      data: updatedCategory,
    };
  }

  async remove(id: number) {
    const findCategory = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!findCategory) {
      throw new NotFoundException('Category not found❗');
    }

    await this.uploadService.removeFile({ fileName: findCategory.image });

    this.categoryRepository.delete({ id });
    return {
      message: 'Success✅',
      data: id,
    };
  }
}
