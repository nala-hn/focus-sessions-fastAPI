import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryUpdateDto {
  @ApiProperty({ example: 'Kerja', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '#FF0000', required: false })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  flag_aktif?: boolean;
}
