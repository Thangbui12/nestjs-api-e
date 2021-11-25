import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { EmailScheduleService } from './email-schedule.service';

@Module({
  imports: [EmailModule],
  providers: [EmailScheduleService],
  exports: [EmailScheduleService],
})
export class EmailScheduleModule {}
