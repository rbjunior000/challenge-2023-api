import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/service/auth.service';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UserService, PrismaService, ConfigService, AuthService],
  controllers: [UserController],
  imports: [AuthModule],
})
export class UserModule {}
