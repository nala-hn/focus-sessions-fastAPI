import { useEffect, useState } from "react";
import api from "../api/client";
import type { FocusSession } from "../types/focus";

export default function FocusPage() {
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    const res = await api.get<FocusSession[]>("/sessions");
    setSessions(res.data);
  };

  const startSession = async () => {
    await api.post("/sessions", {
      title,
      category,
      start_time: new Date().toISOString(),
    });

    setTitle("");
    setCategory("");
    fetchSessions();
  };

  const stopSession = async (id: number) => {
    await api.put(`/sessions/${id}/stop`);
    fetchSessions();
  };

  const deleteSession = async (id: number) => {
    await api.delete(`/sessions/${id}`);
    fetchSessions();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Focus Tracker</h2>

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button onClick={startSession}>Start</button>

      <hr />

      <ul>
        {sessions.map((s) => (
          <li key={s.id}>
            <b>{s.title}</b> ({s.category})
            {!s.end_time && (
              <button onClick={() => stopSession(s.id)}>Stop</button>
            )}
            <button onClick={() => deleteSession(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
