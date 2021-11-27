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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/common/file-upload.utils';
import { CreateProductDto } from './dtos/create-product.dto';
import { DeleteImagesDto } from './dtos/delete-images.dto';
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
  @ApiQuery({ name: 'category', example: 'Cat', required: false })
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

  @Post(':id/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiOperation({ summary: "Upload product's images" })
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadImages(@Param('id') id: string, @UploadedFiles() files: any) {
    return this.productsService.uploadProductImages(id, files);
  }

  @Put(':id/remove-images')
  @ApiOperation({ summary: "Remove product' images" })
  removeImages(@Param('id') id: string, @Body() deleteImages: DeleteImagesDto) {
    return this.productsService.deleteProductImages(id, deleteImages);
  }
}
