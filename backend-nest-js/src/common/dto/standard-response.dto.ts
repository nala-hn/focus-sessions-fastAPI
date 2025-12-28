export class StandardResponseDto<T> {
  result: string;
  detail: string;
  code: number;
  version?: string;
  data?: T;
}

export class PaginatedResponseDto<T> {
  page: number;
  limit: number;
  total: number;
  list: T[];
}
