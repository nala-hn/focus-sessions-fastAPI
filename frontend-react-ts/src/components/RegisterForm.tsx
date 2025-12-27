import React, { useState } from 'react';
import { register } from '../api/authApi';

interface RegisterFormProps {
  onRegisterSuccess: () => void;
  setAlert: (alert: { type: 'success' | 'error'; message: string } | null) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess, setAlert }) => {
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
        <legend className="fieldset-legend">Create new account</legend>

        <label className="label">Username</label>
        <input 
          type="text" 
          className="input" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />

        <label className="label">Email</label>
        <input 
          type="email" 
          className="input" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />

        <label className="label">Password</label>
        <input 
          type="password" 
          className="input" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button type="submit" className="btn btn-neutral mt-4">Register</button>
      </fieldset>
    </form>
  );
};

export default RegisterForm;
