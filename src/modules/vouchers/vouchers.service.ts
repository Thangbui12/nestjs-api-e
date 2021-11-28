import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IJwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';
import { CreateVoucherDto } from './dtos/createVoucher.dto';
import { UpdateVoucherDto } from './dtos/updateVoucher.dto';
import { IVoucherDoc } from './interfaces/voucher.interface';
import { VOUCHER_MODEL } from './schemas/voucher.schema';

@Injectable()
export class VouchersService {
  constructor(
    @InjectModel(VOUCHER_MODEL)
    private readonly voucherModel: Model<IVoucherDoc>,
    private readonly usersSerive: UsersService,
  ) {}

  async create(createVoucherDto: CreateVoucherDto): Promise<IVoucherDoc> {
    const { code } = createVoucherDto;
    const voucher = await this.voucherModel.findOne({ code });
    if (voucher) {
      throw new HttpException(
        'Voucher already exists!',
        HttpStatus.BAD_REQUEST,
      );
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

  async claimVoucher(id: string, payload: IJwtPayload) {
    const user = await this.usersSerive.findOne(payload);
    const voucher = await this.findOneById(id);
    const voucherExisted = user.vouchers.includes(voucher._id);

    if (!!voucherExisted) {
      throw new HttpException('User own Voucher!!!', HttpStatus.BAD_REQUEST);
    }

    this.usersSerive.voucherClaim(user._id, voucher._id);
    let changedQuantity = +voucher.quantity - 1;
    if (changedQuantity < -1) {
      throw new HttpException(
        'Voucher is out of stock!',
        HttpStatus.BAD_REQUEST,
      );
    }
    await voucher.updateOne({ quantity: changedQuantity });
    return {
      message: 'Claim Voucher Success',
    };
  }

  //Method
}
