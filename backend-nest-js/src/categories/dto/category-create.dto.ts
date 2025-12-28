import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryCreateDto {
  @ApiProperty({ example: 'Kerja' })
  @IsString()
  name: string;

  @ApiProperty({ example: '#FF0000', required: false })
  @IsString()
  @IsOptional()
  color?: string;
}
