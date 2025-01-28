import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '@utils';
import { UploadService } from './upload.service';
import { RemoveFileDto, UploadFileDto } from './dto';

@ApiTags('Upload')
@Controller({ version: "1", path: "uploads" })
export class UploadController {

  constructor(private service: UploadService) { }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.ADMIN, UserRoles.USER])
  @ApiOperation({ summary: 'Yangi file yaratish' })
  @ApiConsumes("multipart/form-data")
  @Post('/add')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() payload: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.service.uploadFile({ ...payload, file });
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.ADMIN, UserRoles.USER])
  @ApiOperation({ summary: 'mavjud faylni o\'chirish' })
  @Delete('/remove')
  async removeFile(
    @Body() payload: RemoveFileDto,
  ) {
    return this.service.removeFile(payload);
  }
}
