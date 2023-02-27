import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/user/service/user.service';
import { AuthService } from '../service/auth.service';
import { SignDto } from './auth.dto';
import { HasAuthorization } from '../../decorators/has-authorization';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly user: UserService,
    private readonly auth: AuthService,
  ) {}
  @Get('me')
  @UseGuards(HasAuthorization)
  async me(@Req() req): Promise<User> {
    const user = await this.user.getUser(req.userId);
    return user;
  }
  @Post('signin')
  async signIn(@Body() data: SignDto): Promise<User | BadRequestException> {
    const user = await this.auth.signIn(data.email, data.password);
    return user;
  }
}
