import { useEffect, useState } from "react"
import FocusForm from "../components/FocusForm"
import { getSessions, stopSession } from "../api/referensiAPI"
import type { FocusSession } from "../types/focus"

export default function FocusPage() {
  const [sessions, setSessions] = useState<FocusSession[]>([])
  const [now, setNow] = useState(Date.now())

  const fetchSessions = () =>
    getSessions().then(res => setSessions(res.data))

  useEffect(() => {
    fetchSessions()
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  const calcDuration = (start: string) => {
    const diff = Math.floor((now - new Date(start).getTime()) / 1000)
    const h = Math.floor(diff / 3600)
    const m = Math.floor((diff % 3600) / 60)
    const s = diff % 60
    return `${h}h ${m}m ${s}s`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <FocusForm onSuccess={fetchSessions} />

        {sessions.map(s => (
          <div
            key={s.id}
            className="bg-white rounded-xl p-4 shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-500">
                {s.category.name}
              </p>

              {!s.end_time && (
                <p className="text-pink-500 font-mono">
                  ⏱ {calcDuration(s.start_time)}
                </p>
              )}
            </div>

            {!s.end_time && (
              <button
                onClick={() => stopSession(s.id).then(fetchSessions)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg"
              >
                Stop
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
