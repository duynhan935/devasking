import api from '../axios';

export const getUserProfile = async () => {
  const res = await api.get('/api/users/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return res.data;
};

