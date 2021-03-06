import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) {}
}
