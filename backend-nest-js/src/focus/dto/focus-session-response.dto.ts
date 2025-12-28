import { CategoryResponseDto } from '../../categories/dto/category-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FocusSessionResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Belajar NestJS' })
  title: string;

  @ApiProperty({ example: '2025-12-28T09:00:00.000Z' })
  start_time: Date;

  @ApiProperty({ example: '2025-12-28T10:00:00.000Z', required: false })
  end_time?: Date;

  @ApiProperty({ example: 60, required: false })
  duration_minutes?: number;

  @ApiProperty({ type: () => CategoryResponseDto })
  category: CategoryResponseDto;
}
