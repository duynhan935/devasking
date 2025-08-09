/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useLogin } from '@/hooks/auth/useLogin';
import { App } from 'antd';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import { useQueryClient } from '@tanstack/react-query';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate: login, isPending } = useLogin();
    const setUser = useUserStore((state) => state.setUser);
    const { message } = App.useApp();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setShowForgotPassword(false);

        login(
            { email, password },
            {
                onSuccess: (data) => {
                    console.log('Login response data:', data); 
                    setUser({
                        id: data.user.id || data.user._id,
                        name: data.user.name,
                        email: data.user.email,
                        role: data.user.role,
                        isActive: data.user.isActive,
                        isEmailVerified: data.user.isEmailVerified,
                        avatar: data.user.avatar || null,
                    });

                    queryClient.invalidateQueries({ queryKey: ['user-profile'] });

                    message.success('Đăng nhập thành công!');
                    router.push('/');
                },
                onError: (error: any) => {
                    const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại';

                    if (errorMessage === 'Invalid email or password') {
                        setShowForgotPassword(true);
                        message.error('Email hoặc mật khẩu không đúng');
                    } else {
                        message.error(errorMessage);
                    }
                },
            }
        );
    };

    return (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Đăng nhập</h1>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                    <input type="password" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200" disabled={isPending}>
                    {isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>

                {showForgotPassword && (
                    <button type="button" onClick={() => router.push('/auth/forgot-password')} className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md transition duration-200">
                        Quên mật khẩu?
                    </button>
                )}
            </form>

            <p className="text-sm text-center text-gray-600 mt-4">
                Chưa có tài khoản?{' '}
                <a href="/auth/register" className="text-blue-600 hover:underline">
                    Đăng ký ngay
                </a>
            </p>
        </div>
    );
};

export default LoginForm;
