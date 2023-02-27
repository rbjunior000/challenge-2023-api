import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/service/user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [AuthService, ConfigService, UserService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
