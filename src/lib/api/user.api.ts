import api from '../axios';

export const getUserProfile = async () => {
    const res = await api.get('/api/users/me', {
        withCredentials: true,
    });
    return res.data;
};

// Đổi mật khẩu
export type changePasswordPayload = {
    currentPassword: string;
    newPassword: string;
};

export const changePassword = async (payload: changePasswordPayload) => {
    const res = await api.post('/api/users/change-password', payload, {
        withCredentials: true,
    });
    return res.data;
};
