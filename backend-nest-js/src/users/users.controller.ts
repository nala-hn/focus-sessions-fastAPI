import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { StandardResponseDto } from '../common/dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() data: UserCreateDto): Promise<StandardResponseDto<UserResponseDto>> {
    const user = await this.usersService.create(data);
    return {
      code: 201,
      result: 'Sukses',
      detail: 'User registered.',
      data: user,
    };
  }
}
