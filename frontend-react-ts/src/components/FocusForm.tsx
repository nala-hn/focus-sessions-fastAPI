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
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        🚀 Start Focus Session
      </h2>

      <input
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
        placeholder="What are you working on?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="w-full border rounded-lg px-4 py-2 bg-white"
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
      >
        <option value="">Select category</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleStart}
        disabled={loading}
        className="w-full bg-pink-500 text-white py-2 rounded-xl font-semibold hover:bg-pink-600 transition"
      >
        {loading ? "Starting..." : "Start Focus"}
      </button>
    </div>
  )
}
