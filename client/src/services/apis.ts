import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Backend URL
  withCredentials: true,            // If using cookies for auth
});

export const login = async (username: string, password: string) => {
  const response = await api.post('/login', { username, password });
  return response.data;
};

export const getProfile = async (token: string) => {
  const response = await api.get('/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
