import { Module } from '@nestjs/common';
import { LocationService } from './service/location.service';
import { LocationController } from './controller/location.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/service/auth.service';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/service/user.service';

@Module({
  providers: [
    LocationService,
    PrismaService,
    AuthService,
    ConfigService,
    UserService,
  ],
  controllers: [LocationController],
})
export class LocationModule {}
