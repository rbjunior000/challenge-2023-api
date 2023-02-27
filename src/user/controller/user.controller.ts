import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';
import { AuthService } from 'src/auth/service/auth.service';
@Controller('api/v1/user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly auth: AuthService,
  ) {}
  @Get()
  async getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }
  @Post()
  async createUser(@Body() postData: CreateUserDto): Promise<any> {
    await this.auth.validateEmail(postData.email);
    const newUser = await this.auth.signUp(postData);
    return newUser;
  }
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User | null> {
    return this.userService.getUser(id);
  }
  @Put(':id')
  async Update(@Param('id') id: number): Promise<User> {
    return this.userService.updateUser(id);
  }
  @Delete(':id')
  async Delete(@Param('id') id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
