import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'username',
  })
  username: string;

  @ApiProperty({
    example: 'user@mail.com',
  })
  email: string;
  @ApiProperty({
    example: 'password123',
  })
  password: string;
}

