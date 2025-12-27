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
      className="flex justify-between items-center"
    >
      <div>
        <p className="text-pink-500 font-mono text-2xl md:text-7xl mt-2 font-bold justify-center">
          {calcDuration(session.start_time)}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginTop: "8px" }}>
          <div className="badge badge-soft badge-primary">{session.title}</div>
          <div className="badge badge-outline badge-primary">{session.category.name}</div>
        </div>
      </div>
      <button
        onClick={() => onStop(session.id)}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg"
      >
        Stop
      </button>
    </div>
  );
}
