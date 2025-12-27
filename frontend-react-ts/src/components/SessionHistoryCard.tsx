import { useMemo } from "react";
import type { FocusSession } from "../types/focus";

interface SessionHistoryCardProps {
  session: FocusSession;
  onDelete: (id: number) => void;
}

const gradients = [
  "linear-gradient(to right, #f5d484, #f5bb97, #ef9fc5)",
  "linear-gradient(to right, #63dbd1, #aedea9)",
  "linear-gradient(to right, #5ebbec, #9984ee)",
  "linear-gradient(to right, #c29dec, #c29dec)",
];

const useRandomGradient = () => {
  return useMemo(() => {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    return gradients[randomIndex];
  }, []);
};

export default function SessionHistoryCard({ session, onDelete }: SessionHistoryCardProps) {
  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const gradient = useRandomGradient();

  return (
    <div
      key={session.id}
      className="rounded-xl p-4 shadow text-white flex flex-col justify-between h-32"
      style={{ background: gradient }}
    >
      <h3 className="font-semibold text-lg">{capitalizeWords(session.title)}</h3>
      <div className="flex justify-between items-center">
        <p className="text-sm opacity-80">( {capitalizeWords(session.category.name)} )</p>
        <button
          onClick={() => onDelete(session.id)}
          className="bg-white/30 backdrop-blur-sm text-white rounded-full w-8 h-8 flex items-center justify-center"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
}
