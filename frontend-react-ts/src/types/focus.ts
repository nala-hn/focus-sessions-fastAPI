export interface Category {
  id: number;
  name: string;
  color: string | null;
  flag_aktif: boolean;
  created_at: string;
}

export interface FocusSession {
  id: number;
  title: string;
  start_time: string;
  end_time: string | null;
  duration_minutes: number | null;
  category: Category;
}

export interface PaginatedResponse<T> {
  page: number;
  limit: number;
  total: number;
  list: T[];
}

export interface StandardResponse<T> {
  result: string;
  detail: string;
  code: number;
  version: string | null;
  data: T;
}
