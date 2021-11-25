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
  Query,
  Req,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
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
  // @ApiQuery({ name: 'quantity' })
  // @ApiQuery({ name: 'price' })
  @ApiQuery({ name: 'category', example: 'Cat' })
  @Get('')
  async findAll(@Query('category') query: string) {
    return this.productsService.findAll(query);
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
