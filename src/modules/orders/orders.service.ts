import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import * as moment from 'moment';
import * as crypto from 'crypto';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { IOrderDoc } from './interfaces/order.interface';
import { ORDER_MODEL } from './schemas/order.schema';
import { VouchersService } from '../vouchers/vouchers.service';
import { UsersService } from '../users/users.service';
import { IJwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(ORDER_MODEL)
    private readonly ordersModel: Model<IOrderDoc>,
    private readonly productsService: ProductsService,
    private readonly vouchersService: VouchersService,
    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<IOrderDoc[]> {
    return this.ordersModel.find({});
  }

  async findOneById(id: string): Promise<IOrderDoc> {
    const order = await this.ordersModel.findById({ _id: id });
    if (!order) {
      throw new NotFoundException('Order not exists');
    }
    return order;
  }

  async create(
    payloadUser: IJwtPayload,
    createOrderDto: CreateOrderDto,
  ): Promise<IOrderDoc> {
    const { items, voucher, address } = createOrderDto;
    const user = await this.usersService.findOne(payloadUser);

    const newItems = await Promise.all(
      items.map(async (item) => {
        let product = await this.productsService.findOneById(
          item.product.toString(),
        );

        let flashSalePopulated = await product.populate('flashSale');
        let flashSale = flashSalePopulated.flashSale;
        //FlashSale existed
        if (!!flashSale) {
          if (!(product.quantity >= item.quantity)) {
            throw new HttpException(
              'Product out of stock',
              HttpStatus.BAD_REQUEST,
            );
          }

          if (
            !(
              moment(flashSale['timeStart']) <= moment() &&
              moment() <= moment(flashSale['timeEnd'])
            )
          ) {
            throw new HttpException(
              'Time not exprires!',
              HttpStatus.BAD_REQUEST,
            );
          }

          let flashSaleDiscount =
            product.price * (flashSale['discountPercent'] / 100) * 1;

          let totalItemPrice =
            item.quantity * product.price -
            flashSaleDiscount * item.quantity * 1;
          const productquantityupdated = product.quantity - item.quantity * 1;
          await product.updateOne({ quantity: productquantityupdated });

          return {
            product: item.product,
            quantity: item.quantity,
            totalItemPrice,
            name: product.name,
          };
        } else if (!flashSale) {
          if (!(product.quantity >= item.quantity)) {
            throw new HttpException(
              'Product ouf of stock',
              HttpStatus.BAD_REQUEST,
            );
          }

          let totalItemPrice = item.quantity * product.price * 1;
          const productquantityupdated = product.quantity - item.quantity * 1;
          await product.updateOne({ quantity: productquantityupdated });

          return {
            product: item.product,
            quantity: item.quantity,
            totalItemPrice,
            name: product.name,
          };
        }
      }),
    );
    //console.log(newItems);
    const voucherOrder = await this.vouchersService.findOneById(
      voucher.toString(),
    );

    const totalQuantity = newItems.reduce((total, amout) => {
      return total + amout.quantity;
    }, 0);

    const totalPayOrder = newItems.reduce((total, amout) => {
      return total + amout.totalItemPrice;
    }, -voucherOrder.discount * 1);

    const name = `ORDER-${crypto.randomBytes(10).toString('hex')}`;

    //console.log('TotalQuantity: ', totalQuantity);
    //console.log('totalPayOrder: ', totalPayOrder);
    const orderId = new mongoose.Types.ObjectId();
    await user.updateOne({ $push: { orders: orderId } });

    const orderCreateRequired = {
      _id: orderId,
      name,
      items: newItems,
      voucher,
      address,
      totalQuantity,
      totalPayOrder,
    };
    const orderCreate = new this.ordersModel(orderCreateRequired);
    return await orderCreate.save();
  }

  async deleteOneById(id: string): Promise<any> {
    await this.findOneById(id);
    await this.ordersModel.deleteOne({ _id: id });

    return {
      message: 'Delete Success!',
    };
  }
}
