import { CategoryResponseDto } from '../../categories/dto/category-response.dto';

export class FocusSessionResponseDto {
  id: number;
  title: string;
  start_time: Date;
  end_time?: Date;
  duration_minutes?: number;
  category: CategoryResponseDto;
}
