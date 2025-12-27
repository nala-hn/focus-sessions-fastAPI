import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FocusForm from "../components/FocusForm";
import { getSessions, stopSession, deleteSession } from "../api/referensiAPI";
import type { FocusSession } from "../types/focus";
import ConfirmationModal, { type ConfirmationModalRef } from "../components/ConfirmationModal";
import ActiveSessionCard from "../components/ActiveSessionCard";
import SessionHistoryCard from "../components/SessionHistoryCard";
import Pagination from "../components/Pagination";

export default function FocusPage() {
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [now, setNow] = useState(Date.now());
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const modalRef = useRef<ConfirmationModalRef>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(9);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const fetchSessions = (page = 1) =>
    getSessions(page, limit).then((paginatedData) => {
      setSessions(paginatedData.list);
      setTotalPages(Math.ceil(paginatedData.total / limit));
      setCurrentPage(page);
    });

  useEffect(() => {
    fetchSessions();
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStopSession = (id: number) => {
    stopSession(id).then(() => fetchSessions(currentPage));
  };

  const handleDelete = async () => {
    if (selectedSessionId) {
      await deleteSession(selectedSessionId);
      fetchSessions(currentPage);
      modalRef.current?.hideModal();
    }
  };

  const openDeleteModal = (id: number) => {
    setSelectedSessionId(id);
    modalRef.current?.showModal();
  };

  const activeSessions = sessions.filter((s) => !s.end_time);
  const finishedSessions = sessions.filter((s) => s.end_time);

  return (
    <div className="min-h-screen gradient-bg-animated p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="absolute top-4 right-4">
          <button onClick={handleLogout} className="btn btn-circle btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
        <div className="bg-white/30 backdrop-blur-md rounded-2xl ring-2 ring-white/50 shadow-lg shadow-white/80 p-6 space-y-4">
          <FocusForm onSuccess={() => fetchSessions(currentPage)} />

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

          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={fetchSessions}
            />
          </div>
        </div>
      </div>

      <ConfirmationModal
        ref={modalRef}
        onConfirm={handleDelete}
        title="Delete Session"
        message="Are you sure you want to delete this session?"
      />
    </div>
  );
}
