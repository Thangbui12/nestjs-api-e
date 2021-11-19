import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos/category.dto';
import { ICategoryDoc } from './interfaces/category.interface';
import { CATEGORY_MODEL } from './schema/createCategory.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(CATEGORY_MODEL)
    private readonly categoryModel: Model<ICategoryDoc>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<ICategoryDoc> {
    const { name } = createCategoryDto;
    const nameExisted = await this.categoryModel.findOne({ name });
    if (!!nameExisted) {
      throw new HttpException(
        'Category already exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const categoryCreate = new this.categoryModel(createCategoryDto);
    return await categoryCreate.save();
  }

  async findAll(): Promise<ICategoryDoc[]> {
    return await this.categoryModel.find({});
  }

  async findOneById(id: string): Promise<ICategoryDoc> {
    const category = await this.categoryModel.findById({ _id: id });
    if (!category) {
      throw new NotFoundException('Category not exists');
    }

    return category;
  }

  async updateOneById(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<any> {
    const category = await this.findOneById(id);
    await category.updateOne(updateCategoryDto);
    return {
      message: 'Update Category Success!',
    };
  }

  async DeleteOneById(id: string): Promise<any> {
    await this.findOneById(id);

    await this.categoryModel.deleteOne({ _id: id });
    return {
      message: 'Delete Success!',
    };
  }
}
