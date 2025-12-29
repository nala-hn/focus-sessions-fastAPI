import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Kerja' })
  name: string;

  @ApiProperty({ example: '#FF0000', required: false })
  color?: string;

  @ApiProperty({ example: true })
  flag_aktif: boolean;

  @ApiProperty({ example: '2025-12-28T09:00:00.000Z' })
  created_at: Date;
}
