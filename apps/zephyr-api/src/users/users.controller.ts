import { Controller, Get, Post, Version } from '@nestjs/common';
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
  async createUser() {
    const data = {
      username: 'testuser',
      emailAddress: 'real.email@email.com',
      password: 'fakepassword',
    };
    return await this._userService.createUser(data);
  }
}
