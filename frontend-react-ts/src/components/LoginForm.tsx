import React, { useState } from 'react';
import { login } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = await login({ username, password });
      localStorage.setItem('token', data.access_token);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
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
