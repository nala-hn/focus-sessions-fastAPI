import api from './client';
import type { LoginFormInputs, RegisterFormInputs } from '../types/auth';

export const login = async (credentials: LoginFormInputs) => {
  const params = new URLSearchParams();
  params.append('username', credentials.username);
  params.append('password', credentials.password);

  const response = await api.post('/auth/token', params);
  return response.data;
};

export const register = async (data: RegisterFormInputs) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};
