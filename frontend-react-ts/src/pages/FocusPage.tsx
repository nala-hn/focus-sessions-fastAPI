import { useEffect, useState } from "react";
import FocusForm from "../components/FocusForm";
import { getSessions, stopSession, deleteSession } from "../api/referensiAPI";
import type { FocusSession } from "../types/focus";
import ConfirmationModal from "../components/ConfirmationModal";
import ActiveSessionCard from "../components/ActiveSessionCard";
import SessionHistoryCard from "../components/SessionHistoryCard";

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

  const handleStopSession = (id: number) => {
    stopSession(id).then(fetchSessions);
  };

  const handleDelete = async () => {
    if (selectedSessionId) {
      await deleteSession(selectedSessionId);
      fetchSessions();
      setShowModal(false);
    }
  };

  const openDeleteModal = (id: number) => {
    setSelectedSessionId(id);
    setShowModal(true);
  };

  const activeSessions = sessions.filter((s) => !s.end_time);
  const finishedSessions = sessions.filter((s) => s.end_time);

  return (
    <div className="min-h-screen gradient-bg-animated p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white/30 backdrop-blur-md rounded-2xl ring-2 ring-white/50 shadow-lg shadow-white/80 p-6 space-y-4">
          <FocusForm onSuccess={fetchSessions} />

          {activeSessions.map((s) => (
            <>
              <div className="divider divider-info"></div>
              <ActiveSessionCard
                key={s.id}
                session={s}
                onStop={handleStopSession}
                now={now}
              />
              <div className="divider divider-warning"></div>
            </>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {finishedSessions.map((s) => (
              <SessionHistoryCard
                key={s.id}
                session={s}
                onDelete={openDeleteModal}
              />
            ))}
          </div>
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
