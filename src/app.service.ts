import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SES, SendRawEmailCommand } from '@aws-sdk/client-ses';

@Injectable()
export class AppService {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      SES: {
        ses: new SES({
          apiVersion: '2010-12-01',
          region: 'ap-northeast-2',
          credentials: {
            accessKeyId: '', // IAM 액세스 키
            secretAccessKey: '', // IAM 비밀 액세스 키
          },
        }),
        aws: { SendRawEmailCommand },
      },
    });
  }

  async sendMailForm() {
    const response = await this.transporter.sendMail({
      from: '', // AWS SES에서 인증받은 메일
      to: '', // 받는 사람 이메일
      subject: 'Nice to meet you~!!', // 메일 제목
      html: `<h1>Hello World</h1>`, // 본문 내용
    });
    return response;
  }
}
