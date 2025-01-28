import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto.ts';
import { UpdateCategory } from './dto/update-category.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Category')
@Controller({ version: '1', path: 'categories' })
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @ApiOperation({ summary: 'Create category' })
  @ApiConsumes('multipart/form-data')
  @Post('add')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'icon', maxCount: 1 },
    ]),
  )
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFiles()
    files: { image: Express.Multer.File; icon: Express.Multer.File },
  ) {
    return this.categoryService.createCategory(createCategoryDto, files.image[0], files.icon[0]);
  }

  @Get('/all')
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('/single/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(+id);
  }

  @Patch('/update/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'icon', maxCount: 1 },
    ]),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategory: UpdateCategory,
    @UploadedFiles()
    files: { image: Express.Multer.File; icon: Express.Multer.File },
  ) {
    return this.categoryService.update(id, updateCategory, files.image[0], files.icon[0]);
  }

  @Delete('/remove/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
