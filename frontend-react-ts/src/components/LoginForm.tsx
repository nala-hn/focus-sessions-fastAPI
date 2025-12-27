import React, { useState } from 'react';
import { login } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  setAlert: (alert: { type: 'success' | 'error'; message: string } | null) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setAlert }) => {
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
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Username</label>
            <input 
                type="text" 
                className="input" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label className="label">Password</label>
            <input 
                type="password" 
                className="input" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn btn-neutral mt-4">Login</button>
        </fieldset>
    </form>
  );
};

export default LoginForm;
