import { ApiProperty } from '@nestjs/swagger';

export class StandardResponseDto<T> {
  @ApiProperty({ example: 'Sukses' })
  result: string;

  @ApiProperty({ example: 'OK' })
  detail: string;

  @ApiProperty({ example: 200 })
  code: number;

  @ApiProperty({ example: '1.0', required: false })
  version?: string;

  @ApiProperty({ required: false })
  data?: T;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ isArray: true })
  list: T[];
}
