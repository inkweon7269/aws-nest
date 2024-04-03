import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('profile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multerS3({
        s3: new S3Client({
          region: 'ap-northeast-2', // 리전 정보
          credentials: {
            accessKeyId: '', // 버킷 액세스 키
            secretAccessKey: '', // 버킷 비밀 액세스 키
          },
        }),
        bucket: '', // 버킷명
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          const filename = `${Date.now().toString()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
