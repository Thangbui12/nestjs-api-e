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
import { GetUser } from 'src/common/decorators/getUser.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guards';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IJwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { CreateVoucherDto } from './dtos/createVoucher.dto';
import { UpdateVoucherDto } from './dtos/updateVoucher.dto';
import { VouchersService } from './vouchers.service';

@ApiTags('Voucher')
@Controller('vouchers')
export class VouchersController {
  constructor(private readonly voucherService: VouchersService) {}

  @ApiOperation({ summary: 'Create Voucher' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createVoucherDto: CreateVoucherDto) {
    return this.voucherService.create(createVoucherDto);
  }

  @ApiOperation({ summary: 'Update Voucher' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get('claim/:id')
  claimVoucher(@Param('id') id: string, @GetUser() payload: IJwtPayload) {
    return this.voucherService.claimVoucher(id, payload);
  }

  @ApiOperation({ summary: 'Get All Vouchers' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.voucherService.findAll();
  }

  @ApiOperation({ summary: 'Get Voucher By Id' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voucherService.findOneById(id);
  }

  @ApiOperation({ summary: 'Update Voucher' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateOneById(
    @Param('id') id: string,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ) {
    return this.voucherService.updateOneById(id, updateVoucherDto);
  }

  @ApiOperation({ summary: 'Update Voucher' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteOneById(@Param('id') id: string) {
    return this.voucherService.deleteOneById(id);
  }
}
