import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags("Brand")
@Controller({ version: "1", path: "brands" })
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @ApiConsumes("multipart/form-data")
  @Post("/add")
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Body() createBrandDto: CreateBrandDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.brandService.create({ ...createBrandDto, image });
  }

  @Get("/all")
  findAll() {
    return this.brandService.findAll();
  }

  @Get('/single/:id')
  findOne(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.brandService.findOne(id);
  }

  @Patch('/update/:id')
  @UseInterceptors(FileInterceptor("image"))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBrandDto: UpdateBrandDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.brandService.update(id, {...updateBrandDto, image});
  }

  @Delete('/remove/:id')
  remove(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.brandService.remove(id);
  }
}
