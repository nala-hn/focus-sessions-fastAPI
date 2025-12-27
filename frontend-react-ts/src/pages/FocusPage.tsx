import { useEffect, useState } from "react";
import FocusForm from "../components/FocusForm";
import { getSessions, stopSession, deleteSession } from "../api/referensiAPI";
import type { FocusSession } from "../types/focus";
import ConfirmationModal from "../components/ConfirmationModal";

export default function FocusPage() {
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [now, setNow] = useState(Date.now());
  const [showModal, setShowModal] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null
  );

  const fetchSessions = () =>
    getSessions().then((res) => setSessions(res.data));

  useEffect(() => {
    fetchSessions();
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const calcDuration = (start: string) => {
    const startTime = new Date(start + "Z");
    const diff = Math.floor((now - startTime.getTime()) / 1000);
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const handleDelete = async () => {
    if (selectedSessionId) {
      await deleteSession(selectedSessionId);
      fetchSessions();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-white/30 backdrop-blur-md rounded-2xl ring-2 ring-white/50 shadow-lg shadow-white/80 p-6 space-y-4">
          <FocusForm onSuccess={fetchSessions} />

          {sessions.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-xl p-4 shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.category.name}</p>

                {!s.end_time && (
                  <p className="text-pink-500 font-mono">
                    ⏱ {calcDuration(s.start_time)}
                  </p>
                )}
              </div>

              {!s.end_time ? (
                <button
                  onClick={() => stopSession(s.id).then(fetchSessions)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg"
                >
                  Stop
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedSessionId(s.id);
                    setShowModal(true);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <ConfirmationModal
          onConfirm={handleDelete}
          onClose={() => setShowModal(false)}
          title="Delete Session"
          message="Are you sure you want to delete this session?"
        />
      )}
    </div>
  );
}
