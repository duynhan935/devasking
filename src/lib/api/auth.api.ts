import api from '../axios';

// Đăng ký
export type RegisterPayload = {
    email: string;
    password: string;
    name: string;
};

export const registerUser = async (payload: RegisterPayload) => {
    const response = await api.post('/api/auth/register', payload, {
        withCredentials: true,
    });
    return response.data;
};

// Đăng nhập

export type LoginPayload = {
    email: string;
    password: string;
};

export const LoginUser = async (payload: LoginPayload) => {
    const response = await api.post('/api/auth/login', payload, {
        withCredentials: true,
    });
    return response.data;
};

// Đăng xuất
export const logoutUser = async () => {
    const response = await api.post(
        '/api/auth/logout',
        {},
        {
            withCredentials: true,
        }
    );
    return response.data;
};

// Xác thực email người dùng
export const verifyEmail = async (code: string) => {
    const response = await api.get('/api/auth/verify-email', {
        params: { code },
        withCredentials: true,
    });
    return response.data;
};

// Yêu cầu password reset code
export type RequestPasswordResetPayload = {
    email: string;
};

export const requestPasswordReset = async (payload: RequestPasswordResetPayload) => {
    const response = await api.post('/api/auth/forgot-password', payload, {
        withCredentials: true,
    });
    return response.data;
};

// Xác thực password reset code và lấy token
export type VerifyPasswordResetPayload = {
    email: string;
    code: string;
};

export const verifyPasswordReset = async (payload: VerifyPasswordResetPayload) => {
    const response = await api.post('/api/auth/verify-reset-code', payload, {
        withCredentials: true,
    });
    return response.data;
};

// Reset mật khẩu
export type ResetPasswordPayload = {
    resetToken: string;
    newPassword: string;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
    const response = await api.post('/api/auth/reset-password', payload, {
        withCredentials: true,
    });
    console.log('Reset password response:', response.data); // Log the response for debugging

    return response.data;
};
