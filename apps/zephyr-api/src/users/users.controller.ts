import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Version,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private _userService: UsersService) {}

  @Get('all')
  @Version('1')
  async getAllUsers() {
    return await this._userService.getAllUsers();
  }

  @Post('all')
  @Version('1')
  async createUser(@Body() body: Prisma.UserCreateInput) {
    return await this._userService.createUser(body);
  }

  @Delete(':username')
  @Version('1')
  async deleteUserByUsername(@Param('username') username: string) {
    const deleted = await this._userService.deleteUserByUsername(username);
    return deleted;
  }
}
