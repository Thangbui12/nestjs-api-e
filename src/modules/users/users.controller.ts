import {
  BadRequestException,
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
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ForgotPasswordDto } from './dtos/forgotPassword.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { ChangePasswordDto } from './dtos/user-password.dto';
import { CreateUserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('Auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register user' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @ApiTags('User')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users' })
  @Get()
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiTags('User')
  @ApiOperation({ summary: 'Get one user by ID' })
  @ApiBearerAuth('AccessToken')
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @ApiTags('User')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete user by ID' })
  @Delete(':id')
  async deleteOneById(@Param('id') id: string) {
    return this.usersService.deleteOneById(id);
  }

  @ApiTags('User')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('AccessToken')
  @ApiOperation({ summary: 'Get user by Email' })
  @Roles(userRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('email/:slug')
  async findOneByEmail(@Param('slug') slug: string) {
    if (!slug) {
      throw new BadRequestException('Missing `slug` URL parameter');
    }

    return await this.usersService.findOneByEmail(slug);
  }

  @ApiTags('User')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Change password' })
  @Put(':id/change-password')
  async changeUserPassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return await this.usersService.changePassword(id, changePasswordDto);
  }

  @ApiTags('User')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Forgot password' })
  @Put('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.usersService.forgotPassword(forgotPasswordDto);
  }

  @ApiTags('User')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset Password' })
  @Put('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return await this.usersService.resetPassword(token, resetPasswordDto);
  }
}
