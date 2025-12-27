import api from "./client";
import type { StandardResponse, PaginatedResponse, FocusSession, Category } from '../types/focus';

export const getSessions = (page = 1, limit = 9) =>
  api.get<StandardResponse<PaginatedResponse<FocusSession>>>(`/sessions/browse?page=${page}&limit=${limit}`).then(res => res.data.data);

export const createSession = (data: {
  title: string;
  category_id: number;
}) =>
  api.post<StandardResponse<FocusSession>>("/sessions/insert", data).then(res => res.data.data);

export const stopSession = (id: number) =>
  api.put<StandardResponse<FocusSession>>(`/sessions/update/${id}/stop`).then(res => res.data.data);

export const deleteSession = (id: number) =>
  api.delete<StandardResponse<null>>(`/sessions/delete/${id}`).then(res => res.data);

export const getCategories = () =>
  api.get<StandardResponse<PaginatedResponse<Category>>>("/categories/browse").then(res => res.data.data);


