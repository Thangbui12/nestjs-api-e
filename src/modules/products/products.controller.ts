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
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { userRole } from 'src/common/common.constans';
import { Roles } from 'src/common/decorators/roles.decorator';
import { editFileName, imageFileFilter } from 'src/common/file-upload.utils';
import { RolesGuard } from 'src/common/guards/role.guards';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all products' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  // @ApiQuery({ name: 'quantity' })
  // @ApiQuery({ name: 'price' })
  @ApiQuery({ name: 'category', example: 'Cat', required: false })
  @Get('')
  findAll(@Query('category') query: string) {
    return this.productsService.findAll(query);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get product by Id' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.productsService.findOneById(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update product by Id' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  updateOneById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateOneById(id, updateProductDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete product by Id' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteOneById(@Param('id') id: string) {
    return this.productsService.deleteOneById(id);
  }

  @Post(':id/upload')
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: "Remove product' images" })
  removeImages(@Param('id') id: string, @Body() deleteImages: DeleteImagesDto) {
    return this.productsService.deleteProductImages(id, deleteImages);
  }
}
