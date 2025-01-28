import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entities'
import { UploadService } from '../upload';
import { BrandService } from '../brand/brand.service';
import { Brand } from '../brand/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Brand])],
  controllers: [CategoryController],
  providers: [CategoryService, UploadService, BrandService],
})
export class CategoryModule {}
