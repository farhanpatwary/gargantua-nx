import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { prisma } from '../prisma/client';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class UsersService {
  constructor(private _authService: AuthService) {}
  getAllUsers() {
    const users = prisma.user.findMany();
    return users;
  }

  getUserByUsername(username: string) {
    const user = prisma.user.findFirst({ where: { username } });
    return user;
  }

  async createUser(userData: Prisma.UserCreateInput) {
    // Hash user password with 10 rounds of hashing
    const hash = await this._authService.generateHashedPassword(
      userData.password
    );
    userData.password = hash;

    const token = this._authService.generateToken({
      username: userData.username,
    });
    userData.tokens = [token] as Prisma.JsonArray;

    const user = prisma.user.create({
      data: userData,
      select: { username: true, emailAddress: true },
    });
    return { user, token };
  }

  deleteUserByUsername(username: string) {
    const deleted = prisma.user.delete({
      where: { username },
      select: { emailAddress: true, username: true },
    });
    return deleted;
  }

  async validateUser(username: string, pass: string): Promise<Partial<User>> {
    const user = await this.getUserByUsername(username);
    if (!user) {
      throw new NotFoundException();
    }
    // Verify password with hash
    const isValid = await this._authService.verifyHashedPassword(
      pass,
      user.password
    );
    if (isValid) {
      const { emailAddress, username } = user;
      return { emailAddress, username };
    }
    return null;
  }
}
