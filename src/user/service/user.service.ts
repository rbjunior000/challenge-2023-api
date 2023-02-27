import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getAllUser(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
  async getUser(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });
    user && delete user.password;
    return user;
  }
  async createUser(
    @Body() data: Omit<User, 'id' | 'companyId'>,
  ): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
  async updateUser(id: number): Promise<User> {
    return this.prisma.user.update({
      where: { id: Number(id) },
      data: {},
    });
  }
  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id: Number(id) },
    });
  }
  async getUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
