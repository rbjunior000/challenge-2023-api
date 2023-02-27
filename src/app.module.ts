import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './location/location.module';
import { CompanyModule } from './company/company.module';
import { UniqueConstraint } from './decorators/isUnique';
import general from './config/general';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      load: [general],
    }),
    AuthModule,
    LocationModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UniqueConstraint],
})
export class AppModule {}
