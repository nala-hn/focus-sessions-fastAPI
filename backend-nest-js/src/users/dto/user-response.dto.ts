import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user1' })
  username: string;

  @ApiProperty({ example: 'user@mail.com' })
  email: string;
}
