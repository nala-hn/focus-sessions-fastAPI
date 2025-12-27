export interface FocusSession {
  id: number
  title: string
  category_id: number
  category: Category
  start_time: string
  end_time?: string
  duration_minutes?: number
}

export interface Category {
  id: number
  name: string
  color?: string
}
