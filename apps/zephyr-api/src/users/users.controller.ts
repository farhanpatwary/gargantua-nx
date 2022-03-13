import { Controller, Delete, Get, Param, Version } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private _userService: UsersService) {}

  @Get('all')
  @Version('1')
  async getAllUsers() {
    return await this._userService.getAllUsers();
  }

  @Delete(':username')
  @Version('1')
  async deleteUserByUsername(@Param('username') username: string) {
    const deleted = await this._userService.deleteUserByUsername(username);
    return deleted;
  }
}
