import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductSchema, PRODUCT_MODEL } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PRODUCT_MODEL, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
