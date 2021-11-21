import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashSalesController } from './flash-sales.controller';
import { FlashSaleService } from './flash-sales.service';
import { FlashSaleSchema, FLASHSALE_MODEL } from './schemas/flash-sale.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FLASHSALE_MODEL, schema: FlashSaleSchema },
    ]),
  ],
  controllers: [FlashSalesController],
  providers: [FlashSaleService],
})
export class FlashSalesModule {}
