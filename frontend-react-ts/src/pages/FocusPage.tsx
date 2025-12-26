import { useEffect, useState } from "react"
import { getSessions, createSession, stopSession, deleteSession, getCategories } from "../api/referensiAPI"
import type { FocusSession } from "../types/focus"

interface Category {
  id: number
  name: string
}

export default function FocusPage() {
  const [sessions, setSessions] = useState<FocusSession[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const [title, setTitle] = useState("")
  const [categoryId, setCategoryId] = useState<number | "">("")

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    const [sessionRes, categoryRes] = await Promise.all([
      getSessions(),
      getCategories(),
    ])

    setSessions(sessionRes.data)
    setCategories(categoryRes.data)
  }

  const startSession = async () => {
    if (!title || !categoryId) return

    await createSession({
      title,
      category_id: Number(categoryId),
    })

    setTitle("")
    setCategoryId("")
    fetchAll()
  }

  const handleStop = async (id: number) => {
    await stopSession(id)
    fetchAll()
  }

  const handleDelete = async (id: number) => {
    await deleteSession(id)
    fetchAll()
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Focus Tracker</h2>

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
      >
        <option value="">-- Select category --</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button onClick={startSession}>Start</button>

      <hr />

      <ul>
        {sessions.map((s) => (
          <li key={s.id}>
            <b>{s.title}</b> — {s.category.name}

            {!s.end_time && (
              <button onClick={() => handleStop(s.id)}>
                Stop
              </button>
            )}

            <button onClick={() => handleDelete(s.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
