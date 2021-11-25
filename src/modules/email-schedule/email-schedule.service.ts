import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Error } from 'mongoose';
import { SendEmailDto } from '../email/dtos/sendEmail.dto';
import { EmailService } from '../email/email.service';
import { EmailScheduleDto } from './dtos/emailSchedule.dto';

@Injectable()
export class EmailScheduleService {
  constructor(
    private readonly emailService: EmailService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async scheduleEmail(
    emailSchedule: EmailScheduleDto,
    name: string,
  ): Promise<any> {
    const date = new Date(emailSchedule.date);
    const options: SendEmailDto = {
      recipient: emailSchedule.recipient,
      subject: emailSchedule.subject,
      content: emailSchedule.content,
    };

    const job = new CronJob(date, () => {
      this.emailService.sendMail(options);
    });

    this.schedulerRegistry.addCronJob(`${name}`, job);
    job.start();
  }

  async deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
  }
}
