import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { prisma } from '../prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  getAllUsers() {
    const users = prisma.user.findMany();
    return users;
  }

  getUserById(id: string) {
    const user = prisma.user.findFirst({ where: { id } });
    return user;
  }

  async createUser(userData: Prisma.UserCreateInput) {
    const hash = await bcrypt.hash(userData.password, 10);
    userData.password = hash;
    const user = prisma.user.create({
      data: userData,
      select: { username: true, emailAddress: true },
    });
    return user;
  }

  deleteUserByUsername(username: string) {
    const deleted = prisma.user.delete({
      where: { username },
      select: { emailAddress: true, username: true },
    });
    return deleted;
  }
}
