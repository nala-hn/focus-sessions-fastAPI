import React, { useState } from 'react';
import { register } from '../api/authApi';

interface RegisterFormProps {
  onRegisterSuccess: () => void;
  setAlert: (alert: { type: 'success' | 'error'; message: string } | null) => void;
  setIsRegistering: (isRegistering: boolean) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess, setAlert, setIsRegistering }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await register({ username, email, password });
      setAlert({ type: 'success', message: 'Registration successful! Please log in.' });
      onRegisterSuccess();
    } catch (error: any) {
      console.error('Registration failed:', error);
      const errorMessage = error.response?.data?.detail || 'Registration failed. Please try again.';
      setAlert({ type: 'error', message: errorMessage });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-white/30 backdrop-blur-md rounded-2xl ring-2 ring-white/50 shadow-lg shadow-white/80 p-6 space-y-4">
        <legend className="fieldset-legend pb-3 text-lg font-semibold text-white">Register</legend>
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
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength={3}
            maxLength={30}
            title="Only letters, numbers or dash"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label className="input input-lg rounded-full flex items-center gap-2 mb-4">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            type="email"
            placeholder="mail@site.com"
            className="grow"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="Password"
            className="grow"
            minLength={8}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <p className="text-xs text-red-500 mt-1 ml-4">Password must be 8+ characters</p>

        <div className="flex justify-start gap-4 items-center mt-6">
          <button type="submit" className="btn rounded-full bg-violet-200 text-violet-700 hover:bg-violet-300 border-none">Register</button>
          <a href="#" className="link" onClick={(e) => {
            e.preventDefault();
            setIsRegistering(false);
          }}>
            Or login
          </a>
        </div>
      </fieldset>
    </form>
  );
};

export default RegisterForm;
