import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiTags('Product')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create Product' })
  @Post('create')
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiTags('Product')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all products' })
  @Get('')
  async findAll() {
    return this.productsService.findAll();
  }

  @ApiTags('Product')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get product by Id' })
  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.productsService.findOneById(id);
  }

  @ApiTags('Product')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update product by Id' })
  @Put(':id')
  async updateOneById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateOneById(id, updateProductDto);
  }

  @ApiTags('Product')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete product by Id' })
  @Delete(':id')
  async deleteOneById(@Param('id') id: string) {
    return this.productsService.deleteOneById(id);
  }
}
