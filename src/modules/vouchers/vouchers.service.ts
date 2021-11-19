import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVoucherDto } from './dtos/createVoucher.dto';
import { UpdateVoucherDto } from './dtos/updateVoucher.dto';
import { IVoucherDoc } from './interfaces/voucher.interface';
import { VOUCHER_MODEL } from './schemas/voucher.schema';

@Injectable()
export class VouchersService {
  constructor(
    @InjectModel(VOUCHER_MODEL)
    private readonly voucherModel: Model<IVoucherDoc>,
  ) {}

  async create(createVoucherDto: CreateVoucherDto): Promise<IVoucherDoc> {
    const { code } = createVoucherDto;
    const voucher = await this.voucherModel.findOne({ code });

    if (voucher) {
      throw new HttpException('Voucher already exists', HttpStatus.BAD_REQUEST);
    }

    const voucherCreate = new this.voucherModel(createVoucherDto);
    return await voucherCreate.save();
  }

  async findAll(): Promise<IVoucherDoc[]> {
    return await this.voucherModel.find({});
  }

  async findOneById(id: string): Promise<IVoucherDoc> {
    const voucher = await this.voucherModel.findById({ _id: id });

    if (!voucher) {
      throw new NotFoundException('Voucher not exists');
    }

    return voucher;
  }

  async deleteOneById(id: string): Promise<any> {
    await this.findOneById(id);

    await this.voucherModel.deleteOne({ _id: id });

    return {
      message: 'Delete Success!',
    };
  }

  async updateOneById(id: string, updateVoucherDto: UpdateVoucherDto) {
    const voucher = await this.findOneById(id);
    await voucher.updateOne(updateVoucherDto);
    return {
      message: 'Update Voucher Success!',
    };
  }
}
