import api from "./client"

export const getSessions = () =>
  api.get("/sessions/browse")

export const createSession = (data: {
  title: string
  category_id: number
}) =>
  api.post("/sessions/insert", data)

export const stopSession = (id: number) =>
  api.put(`/sessions/update/${id}/stop`)

export const deleteSession = (id: number) =>
  api.delete(`/sessions/delete/${id}`)

export const getCategories = () =>
  api.get("/categories/browse")

