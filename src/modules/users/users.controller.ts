import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { userRole } from 'src/common/common.constans';
import { GetUser } from 'src/common/decorators/getUser.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guards';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { IJwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { ForgotPasswordDto } from './dtos/forgotPassword.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { ChangePasswordDto } from './dtos/user-password.dto';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users' })
  @Get()
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get profile' })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  findMe(@GetUser() payload: IJwtPayload) {
    return this.usersService.findOne(payload);
  }

  @ApiOperation({ summary: "Get me' orders" })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtAuthGuard)
  @Get('orders')
  findMeOrder(@GetUser() payload: IJwtPayload) {
    return this.usersService.findMeOrder(payload);
  }

  @ApiOperation({ summary: 'Get one user by ID' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteOneById(@Param('id') id: string) {
    return this.usersService.deleteOneById(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('AccessToken')
  @ApiOperation({ summary: 'Get user by Email' })
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('email/:slug')
  findOneByEmail(@Param('slug') slug: string) {
    if (!slug) {
      throw new BadRequestException('Missing `slug` URL parameter');
    }

    return this.usersService.findOneByEmail(slug);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Change password' })
  @Put(':id/change-password')
  changeUserPassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(id, changePasswordDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Forgot password' })
  @Put('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.usersService.forgotPassword(forgotPasswordDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset Password' })
  @Put('reset-password/:token')
  resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.usersService.resetPassword(token, resetPasswordDto);
  }
}
