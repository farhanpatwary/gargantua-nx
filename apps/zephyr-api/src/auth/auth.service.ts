import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private _usersService: UsersService
  ) {}
  JWT_SIGNING_SECRET: 'PmzN!Q6CSg3ctkKs';
  SALT_ROUNDS = 10;

  generateToken(data) {
    // Generate JWT token. Token expires in 1 day
    /** seconds in 1 day */
    const day = 60 * 60 * 24;
    /** current date timestamp (in seconds) + 1 day */
    const expires = Math.floor(Date.now() / 1000) + day;
    return jwt.sign(
      {
        expires,
        data,
      },
      this.JWT_SIGNING_SECRET
    );
  }

  generateHashedPassword(password: string) {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  verifyHashedPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
