import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FocusSessionCreateDto {
  @ApiProperty({ example: 'Belajar NestJS' })
  @IsString()
  title: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  category_id: number;
}
