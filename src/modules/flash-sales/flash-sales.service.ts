import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFlashSaleDto } from './dtos/create-flash-sale.dto';
import { UpdateFlashSaleDto } from './dtos/update-flash-sale.dto';
import { IFlashSaleDoc } from './interfaces/flash-sale.interface';
import { FLASHSALE_MODEL } from './schemas/flash-sale.schema';

@Injectable()
export class FlashSaleService {
  constructor(
    @InjectModel(FLASHSALE_MODEL)
    private readonly flashSaleModel: Model<IFlashSaleDoc>,
  ) {}

  async create(createFlashSaleDto: CreateFlashSaleDto): Promise<IFlashSaleDoc> {
    const { flashCode } = createFlashSaleDto;
    const flashSale = await this.flashSaleModel.findOne({ flashCode });

    if (flashSale) {
      throw new HttpException('Flash Sale exists', HttpStatus.BAD_REQUEST);
    }

    const flashSaleCreate = new this.flashSaleModel(createFlashSaleDto);
    return await flashSaleCreate.save();
  }

  async findAll(): Promise<IFlashSaleDoc[]> {
    return await this.flashSaleModel.find({});
  }

  async findOneById(id: string): Promise<IFlashSaleDoc> {
    const voucher = await this.flashSaleModel.findById({ _id: id });

    if (!voucher) {
      throw new NotFoundException('Flash Sale not exists');
    }

    return voucher;
  }

  async deleteOneById(id: string): Promise<any> {
    await this.findOneById(id);

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
}
