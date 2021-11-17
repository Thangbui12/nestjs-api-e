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
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ForgotPasswordDto } from './dtos/forgotPassword.dto';
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
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiTags('User')
  @ApiOperation({ summary: 'Get one user by ID' })
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
  @ApiOperation({ summary: 'Get user by Email' })
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
  async changeUserPassword(@Param('id') id: string) {}

  @ApiTags('User')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Forgot password' })
  @Put('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.usersService.forgotPassword(forgotPasswordDto);
  }
}
