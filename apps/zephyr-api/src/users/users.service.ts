import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { prisma } from '../prisma/client';

@Injectable()
export class UsersService {
  async getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  async getUserById(id: string) {
    const user = await prisma.user.findFirst({ where: { id } });
    return user;
  }

  async createUser(userData: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data: userData });
    return user;
  }
}
