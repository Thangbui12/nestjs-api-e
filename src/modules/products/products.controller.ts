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
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create Product' })
  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all products' })
  // @ApiQuery({ name: 'quantity' })
  // @ApiQuery({ name: 'price' })
  @ApiQuery({ name: 'category', example: 'Cat' })
  @Get('')
  findAll(@Query('category') query: string) {
    return this.productsService.findAll(query);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get product by Id' })
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.productsService.findOneById(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update product by Id' })
  @Put(':id')
  updateOneById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateOneById(id, updateProductDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete product by Id' })
  @Delete(':id')
  deleteOneById(@Param('id') id: string) {
    return this.productsService.deleteOneById(id);
  }
}
