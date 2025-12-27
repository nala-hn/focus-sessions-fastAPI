import { useEffect, useState } from "react"
import { getCategories, createSession } from "../api/referensiAPI"
import type { Category } from "../types/focus"

export default function FocusForm({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryId, setCategoryId] = useState<number | "">("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCategories().then(res => setCategories(res.data))
  }, [])

  const handleStart = async () => {
    if (!title || !categoryId) return

    setLoading(true)
    await createSession({
      title,
      category_id: Number(categoryId),
    })

    setTitle("")
    setCategoryId("")
    setLoading(false)
    onSuccess()
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800">
        🚀 Start Focus Session
      </h2>

      <input type="text" className="input input-md w-full"
        placeholder="What are you working on?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="select select-bordered w-full"
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
      >
        <option value="" disabled>
          Select category
        </option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleStart}
        disabled={loading}
        className="relative w-full bg-purple-400/80 text-white py-3 rounded-2xl font-semibold backdrop-blur-md ring-1 ring-white/40 shadow-lg shadow-purple-500/40 hover:bg-purple-500/80 transition"
      >
        {loading ? "Starting..." : "Start Focus"}
      </button>
    </>
  )
}
