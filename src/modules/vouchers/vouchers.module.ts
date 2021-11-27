import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { VoucherSchema, VOUCHER_MODEL } from './schemas/voucher.schema';
import { VouchersController } from './vouchers.controller';
import { VouchersService } from './vouchers.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VOUCHER_MODEL, schema: VoucherSchema }]),
    UsersModule,
  ],

  controllers: [VouchersController],
  providers: [VouchersService],
  exports: [VouchersService],
})
export class VouchersModule {}
