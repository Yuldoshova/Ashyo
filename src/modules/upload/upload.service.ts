import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { existsSync } from 'fs';
import { RemoveFileDto, UploadFileDto } from './dto';

@Injectable()
export class UploadService {
  constructor() { }

  async uploadFile(payload: UploadFileDto) {
    const extName = path.extname(payload.file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = payload.file.fieldname + '-' + uniqueSuffix + extName;

    const uploadDir = path.join(__dirname, '../../../', payload.destination);
    const fullFilePath = path.join(uploadDir, fileName);

    if (!uploadDir) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(fullFilePath, payload.file.buffer);
    const imageUrl = `${payload.destination}/${fileName}`;

    return {
      imageUrl,
      message: 'File written successfully✅',
    };
  }

  async removeFile(payload: RemoveFileDto) {
    const filePath = path.join(__dirname, '../../../', payload.fileName);

    const isFileExists = existsSync(filePath);
    if (isFileExists) {
      fs.unlinkSync(filePath);
    }

    return {
      message: 'File removed successfully',
    };
  }
}
