import type { FocusSession } from "../types/focus";

interface ActiveSessionCardProps {
  session: FocusSession;
  onStop: (id: number) => void;
  now: number;
}

export default function ActiveSessionCard({ session, onStop, now }: ActiveSessionCardProps) {
  const calcDuration = (start: string) => {
    const startTime = new Date(start + "Z");
    const diff = Math.floor((now - startTime.getTime()) / 1000);
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div
      key={session.id}
      className="justify-center items-center"
    >
      <div>
        <p className="text-pink-500 font-mono text-5xl md:text-7xl font-bold text-center">
          {calcDuration(session.start_time)}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginTop: "8px" }}>
          <div className="badge badge-soft badge-primary">{session.title}</div>
          <div className="badge badge-soft badge-warning">{session.category.name}</div>
          <div
            onClick={() => onStop(session.id)}
            className="badge badge-soft badge-error cursor-pointer"
          >
            Stop
          </div>
        </div>
      </div>
    </div>
  );
}
