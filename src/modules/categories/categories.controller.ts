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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { userRole } from 'src/common/common.constans';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guards';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @ApiTags('Category')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create Category' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiTags('Category')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get All Categories' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @ApiTags('Category')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Category By Id' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOneById(id);
  }

  @ApiTags('Category')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Category By Id' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateOneById(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateOneById(id, updateCategoryDto);
  }

  @ApiTags('Category')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete Category By Id' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteOneById(@Param('id') id: string) {
    return this.categoryService.DeleteOneById(id);
  }
}
