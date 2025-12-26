export interface FocusSession {
  id: number;
  title: string;
  category: string;
  start_time: string;
  end_time?: string;
  duration_minutes?: number;
}
