import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { prisma } from '../prisma/client';

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

  createUser(userData: Prisma.UserCreateInput) {
    const user = prisma.user.create({ data: userData });
    return user;
  }

  deleteUserById(id: string) {
    const deleted = prisma.user.delete({
      where: { id },
      select: { emailAddress: true, username: true },
    });
    return deleted;
  }

  deleteUserByUsername(username: string) {
    const deleted = prisma.user.delete({
      where: { username },
      select: { emailAddress: true, username: true },
    });
    return deleted;
  }
}
