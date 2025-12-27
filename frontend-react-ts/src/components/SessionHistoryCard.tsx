import type { FocusSession } from "../types/focus";

interface SessionHistoryCardProps {
  session: FocusSession;
  onDelete: (id: number) => void;
}

export default function SessionHistoryCard({ session, onDelete }: SessionHistoryCardProps) {
  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div
      key={session.id}
      className="bg-white rounded-xl p-4 shadow flex justify-between items-center"
    >
      <div>
        <div>
          <h3 className="font-semibold">{capitalizeWords(session.title)}</h3>
          <p className="text-sm text-gray-500">{capitalizeWords(session.category.name)}</p>
        </div>
      </div>
      <button
        onClick={() => onDelete(session.id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Delete
      </button>
    </div>
  );
}
