import api from '../axios';

// Đăng ký
export type RegisterPayload = {
    email: string;
    password: string;
    name: string;
};

export const registerUser = async (payload: RegisterPayload) => {
    const response = await api.post('/api/auth/register', payload);
    return response.data;
};

// Đăng nhập

export type LoginPayload = {
    email: string;
    password: string;
};

export const LoginUser = async (payload: LoginPayload) => {
    const response = await api.post('/api/auth/login', payload);
    return response.data;
};