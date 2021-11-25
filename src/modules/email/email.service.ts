import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dtos/sendEmail.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(options: SendEmailDto): Promise<any> {
    try {
      return await this.mailerService.sendMail({
        to: options.recipient,
        subject: options.subject,
        text: options.content,
      });
    } catch (err) {
      console.log('ERROR SEND MAIL: ', err.message);
    }
  }
}
