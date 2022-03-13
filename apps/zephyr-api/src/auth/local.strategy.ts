import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private _userService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<Partial<User>> {
    const user = await this._userService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
