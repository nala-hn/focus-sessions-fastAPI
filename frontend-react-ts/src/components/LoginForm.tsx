import React, { useState } from 'react';
import { login } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  setAlert: (alert: { type: 'success' | 'error'; message: string } | null) => void;
  setIsRegistering: (isRegistering: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setAlert, setIsRegistering }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setAlert(null);
    try {
      const data = await login({ username, password });
      localStorage.setItem('token', data.access_token);
      navigate('/');
    } catch (error: any) {
      console.error('Login failed:', error);
      const errorMessage = error.response?.data?.detail || 'Login failed. Please try again.';
      setAlert({ type: 'error', message: errorMessage });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-white/30 backdrop-blur-md rounded-2xl ring-2 ring-white/50 shadow-lg shadow-white/80 p-6 space-y-4">
        <legend className="fieldset-legend pb-3 text-lg font-semibold text-white">Login</legend>
        <label className="input input-lg rounded-full flex items-center gap-2 mb-4">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
                </g>
            </svg>
            <input
                type="text"
                required
                className="grow"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
        </label>

        <label className="input input-lg rounded-full flex items-center gap-2">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
            </svg>
            <input
                type="password"
                required
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </label>
        
        <div className="flex justify-start gap-4 items-center mt-6">
            <button type="submit" className="btn rounded-full bg-purple-200 text-purple-700 hover:bg-violet-300 border-none">Login</button>
            <a href="#" className="link" onClick={(e) => {
                e.preventDefault();
                setIsRegistering(true);
            }}>
                Or register
            </a>
        </div>
      </fieldset>
    </form>
  );
};

export default LoginForm;
