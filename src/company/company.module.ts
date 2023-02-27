import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/service/auth.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/service/user.service';
import { CompanyController } from './controller/company.controller';
import { CompanyService } from './service/company.service';

@Module({
  controllers: [CompanyController],
  providers: [
    CompanyService,
    PrismaService,
    AuthService,
    ConfigService,
    UserService,
  ],
})
export class CompanyModule {}
