import { useEffect, useState } from "react"
import { getCategories, createSession } from "../api/referensiAPI"

interface Category {
  id: number
  name: string
  color?: string
}

interface FocusFormProps {
  onSuccess?: () => void
}

export default function FocusForm({ onSuccess }: FocusFormProps) {
  const [title, setTitle] = useState("")
  const [categoryId, setCategoryId] = useState<number | "">("")
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories()
        setCategories(res.data)
      } catch (err) {
        console.error(err)
        setError("Failed to load categories")
      }
    }

    fetchCategories()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !categoryId) {
      setError("Title and category are required")
      return
    }

    try {
      setLoading(true)
      setError(null)

      await createSession({
        title,
        category_id: Number(categoryId),
      })

      setTitle("")
      setCategoryId("")

      onSuccess?.()
    } catch (err) {
      console.error(err)
      setError("Failed to create focus session")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <h3>Create Focus Session</h3>

      {error && (
        <p style={{ color: "red", marginBottom: 8 }}>
          {error}
        </p>
      )}

      <div style={{ marginBottom: 12 }}>
        <label>Title</label>
        <br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What are you focusing on?"
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Category</label>
        <br />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          <option value="">-- Select category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Start Focus"}
      </button>
    </form>
  )
}
