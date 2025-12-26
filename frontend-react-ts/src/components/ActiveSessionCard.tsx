import { useEffect, useState } from "react"

interface Props {
  title: string
  startTime: string
  categoryName: string
  onStop: () => void
}

export default function ActiveSessionCard({
  title,
  startTime,
  categoryName,
  onStop,
}: Props) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const start = new Date(startTime).getTime()

    const interval = setInterval(() => {
      const now = Date.now()
      setElapsed(Math.floor((now - start) / 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60

    return `${h}h ${m}m ${s}s`
  }

  return (
    <div className="active-card">
      <h3>{title}</h3>
      <p>{categoryName}</p>

      <h1>{formatTime(elapsed)}</h1>

      <button className="stop-btn" onClick={onStop}>
        Stop Focus
      </button>
    </div>
  )
}
