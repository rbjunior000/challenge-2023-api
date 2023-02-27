import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { encode, decode as jwtDecode } from 'jwt-simple';
import * as moment from 'moment';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class AuthService {
  logger;
  constructor(
    private readonly config: ConfigService,
    private readonly user: UserService,
  ) {
    this.logger = new Logger(AuthService.name);
  }
  async hash(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  compare(otherPassword: string, hash: string) {
    return bcrypt.compare(otherPassword, hash);
  }

  encode(userId: string, duration = 14) {
    const nowDate = new Date();
    const expDate = new Date(nowDate.getTime());
    expDate.setDate(expDate.getDate() + duration);
    const payload = {
      sub: userId,
      iat: nowDate.getTime(),
      exp: expDate,
    };
    return encode(payload, this.config.get('secret_token'));
  }

  decode(bToken: string) {
    try {
      const payload = jwtDecode(bToken, this.config.get('secret_token'));
      if (bToken) {
        if (!payload || payload.exp <= moment().unix()) {
          throw new BadRequestException('Token has expired');
        }
        return { userId: payload.sub, bToken };
      } else {
        this.logger.warn('Token parse error');
        return { userId: null, bToken };
      }
    } catch (err) {
      return { userId: null, bToken };
    }
  }

  async signIn(email, password) {
    const user = await this.user.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Email not found');
    }
    const decodePassword = await this.compare(password, user.password);

    if (!decodePassword) {
      throw new BadRequestException('Wrong password');
    }

    const token = this.encode(String(user.id));

    return { token, ...user };
  }

  async signUp(data) {
    data.password = await bcrypt.hash(data.password, 10);
    const newUser = await this.user.createUser(data);
    return newUser;
  }

  async validateEmail(email: string) {
    const user = await this.user.getUserByEmail(email);

    if (!!user) {
      throw new BadRequestException('Email already exist');
    }

    return user;
  }
}
