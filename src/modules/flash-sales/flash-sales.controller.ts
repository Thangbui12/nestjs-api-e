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
import { CreateFlashSaleDto } from './dtos/create-flash-sale.dto';
import { UpdateFlashSaleDto } from './dtos/update-flash-sale.dto';
import { FlashSaleService } from './flash-sales.service';

@Controller('flash-sales')
export class FlashSalesController {
  constructor(private readonly flashSaleService: FlashSaleService) {}

  @ApiTags('Flash Sale')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create FlashSale' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  async create(@Body() createFlashSaleDto: CreateFlashSaleDto) {
    return this.flashSaleService.create(createFlashSaleDto);
  }

  @ApiTags('Flash Sale')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all Flash Sale' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return this.flashSaleService.findAll();
  }

  @ApiTags('Flash Sale')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get FlashSale by Id' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.flashSaleService.findOneById(id);
  }

  @ApiTags('Flash Sale')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update FlashSale by Id' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateOneById(
    @Param('id') id: string,
    @Body() updateFlashSaleDto: UpdateFlashSaleDto,
  ) {
    return this.flashSaleService.updateOneById(id, updateFlashSaleDto);
  }

  @ApiTags('Flash Sale')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete One by Id' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteOneById(@Param('id') id: string) {
    return this.flashSaleService.deleteOneById(id);
  }
}
