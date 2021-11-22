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
import { CreateVoucherDto } from './dtos/createVoucher.dto';
import { UpdateVoucherDto } from './dtos/updateVoucher.dto';
import { VouchersService } from './vouchers.service';

@Controller('vouchers')
export class VouchersController {
  constructor(private readonly voucherService: VouchersService) {}

  @ApiTags('Voucher')
  @ApiOperation({ summary: 'Create Voucher' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(@Body() createVoucherDto: CreateVoucherDto) {
    return this.voucherService.create(createVoucherDto);
  }

  @ApiTags('Voucher')
  @ApiOperation({ summary: 'Get All Vouchers' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.voucherService.findAll();
  }

  @ApiTags('Voucher')
  @ApiOperation({ summary: 'Get Voucher By Id' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.voucherService.findOneById(id);
  }

  @ApiTags('Voucher')
  @ApiOperation({ summary: 'Update Voucher' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async updateOneById(
    @Param('id') id: string,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ) {
    return this.voucherService.updateOneById(id, updateVoucherDto);
  }

  @ApiTags('Voucher')
  @ApiOperation({ summary: 'Update Voucher' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteOneById(@Param('id') id: string) {
    return this.voucherService.deleteOneById(id);
  }
}
