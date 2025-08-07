import api from '../axios';

export const getUserProfile = async () => {
    const res = await api.get('/api/users/me', {
        withCredentials: true,
    });
    return res.data;
};
