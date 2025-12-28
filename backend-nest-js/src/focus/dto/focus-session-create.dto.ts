import { IsString, IsInt } from 'class-validator';

export class FocusSessionCreateDto {
  @IsString()
  title: string;

  @IsInt()
  category_id: number;
}
