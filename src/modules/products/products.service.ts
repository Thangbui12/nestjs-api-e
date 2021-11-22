import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { IProductDoc } from './interfaces/pruduct.schema';
import { PRODUCT_MODEL } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(PRODUCT_MODEL)
    private readonly productModel: Model<IProductDoc>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<IProductDoc> {
    const { name } = createProductDto;

    const product = await this.productModel.findOne({ name });
    if (!!product) {
      throw new HttpException('Product exists', HttpStatus.BAD_REQUEST);
    }

    const productCreate = new this.productModel(createProductDto);
    return await productCreate.save();
  }

  async findAll(): Promise<IProductDoc[]> {
    return await this.productModel
      .find({})
      .populate({ path: 'category', select: ['name'] });
  }

  async findOneById(id: string): Promise<IProductDoc> {
    const product = await this.productModel.findById({ _id: id });
    if (!product) {
      throw new NotFoundException('Product not exists');
    }
    return product;
  }

  async updateOneById(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<any> {
    const product = await this.findOneById(id);
    await product.updateOne(updateProductDto);
    return {
      message: 'Update Product Success!',
    };
  }

  async deleteOneById(id: string): Promise<any> {
    await this.findOneById(id);
    await this.productModel.deleteOne({ _id: id });

    return {
      message: 'Delete Success!',
    };
  }
}
