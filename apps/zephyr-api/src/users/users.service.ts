import { Injectable } from '@nestjs/common';
import { prisma } from '../prisma/client';

@Injectable()
export class UsersService {
  async getAllUsers() {
    return prisma.user.get();
  }
}
