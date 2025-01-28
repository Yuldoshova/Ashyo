import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { UploadService } from '../upload';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private uploadService: UploadService
  ) { }

  async create(create: CreateUserDto) {

    const conflictUser = await this.userRepository.findOneBy({
      email: create.email
    });
    if (conflictUser) {
      throw new ConflictException('Email already exists❗');
    }

    const uploadImage = await this.uploadService.uploadFile({
      file: create.image,
      destination: "uploads/users"
    })

    const newUser = this.userRepository.create({
      firstName: create.firstName,
      lastName: create.lastName,
      email: create.email,
      image: uploadImage.imageUrl,
      role: create.role
    });

    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();

  }

  async findOne(id: number) {
    const findUser = await this.userRepository.findOne({ where: { id } });
    if (!findUser) {
      throw new NotFoundException('User not found❗');
    }
    return findUser
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async update(id: number, update: UpdateUserDto) {
    const [findUser, conflictUser] = await Promise.all([
      this.userRepository.findOne({ where: { id } }),
      this.userRepository.findOneBy({ email: update.email }),
    ]);

    if (!findUser) {
      throw new NotFoundException('User not found❗');
    }
    if (conflictUser) {
      throw new ConflictException('Email already exists❗');
    }

    if (findUser.image) {
      await this.uploadService.removeFile({ fileName: findUser.image });
    }
    const uploadImage = await this.uploadService.uploadFile({
      file: update.image,
      destination: "uploads/users"
    })

    return await this.userRepository.update({ id }, {
      firstName: update.firstName,
      lastName: update.lastName,
      email: update.email,
      image: uploadImage.imageUrl,
      role: update.role
    });
  }

  async remove(id: number) {
    const findUser = await this.userRepository.findOne({ where: { id } });
    if (!findUser) {
      throw new NotFoundException('User not found❗');
    }
    await this.uploadService.removeFile({ fileName: findUser.image });
    return await this.userRepository.delete({ id });
  }
}
