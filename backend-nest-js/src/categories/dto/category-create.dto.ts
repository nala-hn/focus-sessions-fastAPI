import { IsString, IsOptional } from 'class-validator';

export class CategoryCreateDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  color?: string;
}
