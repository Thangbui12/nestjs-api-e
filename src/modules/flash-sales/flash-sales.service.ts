import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import _ from 'lodash';
import { UsersService } from '../users/users.service';
import { CreateFlashSaleDto } from './dtos/create-flash-sale.dto';
import { UpdateFlashSaleDto } from './dtos/update-flash-sale.dto';
import { IFlashSaleDoc } from './interfaces/flash-sale.interface';
import { FLASHSALE_MODEL } from './schemas/flash-sale.schema';
import { EmailScheduleService } from '../email-schedule/email-schedule.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class FlashSaleService {
  constructor(
    @InjectModel(FLASHSALE_MODEL)
    private readonly flashSaleModel: Model<IFlashSaleDoc>,
    private readonly usersService: UsersService,
    private readonly emailSchuduleService: EmailScheduleService,
    private readonly productsService: ProductsService,
  ) {}

  async create(createFlashSaleDto: CreateFlashSaleDto): Promise<IFlashSaleDoc> {
    const { flashCode, products } = createFlashSaleDto;
    const flashSale = await this.flashSaleModel.findOne({ flashCode });

    if (flashSale) {
      throw new HttpException('Flash Sale exists', HttpStatus.BAD_REQUEST);
    }

    const flashSaleId = new mongoose.Types.ObjectId();

    const timeStart = moment(createFlashSaleDto.timeStart).subtract(
      15,
      'minutes',
    );

    if (timeStart <= moment()) {
      throw new HttpException(
        'TimeStart out of time, Not Fired',
        HttpStatus.BAD_REQUEST,
      );
    }

    const timeStartToDate = moment(createFlashSaleDto.timeStart)
      .subtract(15, 'minutes')
      .toDate();

    const minute = timeStart.minute();
    const hour = timeStart.hour();
    const date = timeStart.date();
    const month = timeStart.month();
    const year = timeStart.year();

    //Cronjob
    const users = await this.usersService.findAll();
    let baseURL = [];
    products.map(async (id) => {
      let URL = `${process.env.BASE_URL}:${process.env.PORT}/api/products/${id}`;
      baseURL.push(URL);

      this.productsService.updateOneById(id.toString(), {
        flashSale: flashSaleId.toString(),
      });
    });

    users.map((user) => {
      if (user.role === 'User') {
        const content = `
          Hi, ${user.username}!
          Flash Sale will start in 15 minutes(${hour
            .toString()
            .padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00 ${month
          .toString()
          .padStart(2, '0')}-${date.toString().padStart(2, '0')}-${year})
              Disount: ${createFlashSaleDto.discountPercent}%
              Please click here:
              ${baseURL.join('\n\t')}
              `;
        // ${_.join(baseURL, '\n\t')}
        const subject = `FLASH SALE ${createFlashSaleDto.flashCode}`;
        const options = {
          date: timeStartToDate,
          recipient: user.email,
          subject,
          content,
        };

        this.emailSchuduleService.scheduleEmail(
          options,
          `${flashCode}-${user.email}`,
        );
      }
    });

    const flashSaleCreate = new this.flashSaleModel({
      _id: flashSaleId,
      ...createFlashSaleDto,
    });
    return await flashSaleCreate.save();
  }

  async findAll(): Promise<IFlashSaleDoc[]> {
    return await this.flashSaleModel.find({});
  }

  async findOneById(id: string): Promise<IFlashSaleDoc> {
    const flashSale = await this.flashSaleModel.findById({ _id: id });

    if (!flashSale) {
      throw new NotFoundException('Flash Sale not exists');
    }

    return flashSale;
  }

  async deleteOneById(id: string): Promise<any> {
    const { products } = await this.findOneById(id);
    console.log(products);
    products.map(async (id) => {
      this.productsService.updateOneById(id.toString(), {
        flashSale: '',
      });
    });
    await this.flashSaleModel.deleteOne({ _id: id });
    return {
      message: 'Delete Success!',
    };
  }

  async updateOneById(id: string, updateFlashSaleDto: UpdateFlashSaleDto) {
    const voucher = await this.findOneById(id);
    await voucher.updateOne(updateFlashSaleDto);
    return {
      message: 'Update Voucher Success!',
    };
  }

  // METHOD
}
