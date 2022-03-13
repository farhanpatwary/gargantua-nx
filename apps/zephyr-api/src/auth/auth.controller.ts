import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { UsersService } from '../users/users.service';

@Controller({ version: '1' })
export class AuthController {
  constructor(private _userService: UsersService) {}
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @Post('auth/sign-up')
  async signUp(@Body() body: Prisma.UserCreateInput) {
    return await this._userService.createUser(body);
  }
}
