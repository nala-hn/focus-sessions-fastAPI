import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CategoryUpdateDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsBoolean()
  @IsOptional()
  flag_aktif?: boolean;
}
