import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VoucherSchema, VOUCHER_MODEL } from './schemas/voucher.schema';
import { VouchersController } from './vouchers.controller';
import { VouchersService } from './vouchers.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VOUCHER_MODEL, schema: VoucherSchema }]),
  ],
  controllers: [VouchersController],
  providers: [VouchersService],
})
export class VouchersModule {}
