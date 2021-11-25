import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailScheduleModule } from '../email-schedule/email-schedule.module';
import { EmailModule } from '../email/email.module';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { FlashSalesController } from './flash-sales.controller';
import { FlashSaleService } from './flash-sales.service';
import { FlashSaleSchema, FLASHSALE_MODEL } from './schemas/flash-sale.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FLASHSALE_MODEL, schema: FlashSaleSchema },
    ]),
    UsersModule,
    EmailScheduleModule,
    ProductsModule,
  ],
  controllers: [FlashSalesController],
  providers: [FlashSaleService],
})
export class FlashSalesModule {}
