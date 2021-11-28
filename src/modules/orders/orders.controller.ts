import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { userRole } from 'src/common/common.constans';
import { GetUser } from 'src/common/decorators/getUser.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guards';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IJwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrdersService } from './orders.service';
@ApiTags('Order')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create Order' })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(
    @GetUser() payload: IJwtPayload,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(payload, createOrderDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all orders' })
  @Get('')
  findAll() {
    return this.ordersService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get order by Id' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.ordersService.findOneById(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete order by Id' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteOneById(@Param('id') id: string) {
    return this.ordersService.deleteOneById(id);
  }
}
