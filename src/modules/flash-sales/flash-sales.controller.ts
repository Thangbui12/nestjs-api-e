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

@ApiTags('Flash Sale')
@Controller('flash-sales')
export class FlashSalesController {
  constructor(private readonly flashSaleService: FlashSaleService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create FlashSale' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  create(@Body() createFlashSaleDto: CreateFlashSaleDto) {
    return this.flashSaleService.create(createFlashSaleDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all Flash Sale' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.flashSaleService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get FlashSale by Id' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.flashSaleService.findOneById(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update FlashSale by Id' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  updateOneById(
    @Param('id') id: string,
    @Body() updateFlashSaleDto: UpdateFlashSaleDto,
  ) {
    return this.flashSaleService.updateOneById(id, updateFlashSaleDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete One by Id' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteOneById(@Param('id') id: string) {
    return this.flashSaleService.deleteOneById(id);
  }
}
