import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { VouchersModule } from '../vouchers/vouchers.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderSchema, ORDER_MODEL } from './schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ORDER_MODEL,
        schema: OrderSchema,
      },
    ]),
    ProductsModule,
    VouchersModule,
    UsersModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
