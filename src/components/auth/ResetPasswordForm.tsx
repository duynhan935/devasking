/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useResetPassword } from '@/hooks/auth/useResetPassword';
import { App } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';

const ResetPasswordForm = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [token, setToken] = useState('');

    const { mutate: resetPassword, isPending } = useResetPassword();
    const { message } = App.useApp();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const tokenParam = searchParams.get('token');
        if (tokenParam) {
            setToken(tokenParam);
        } else {
            // Nếu không có token, chuyển về trang forgot password
            router.push('/auth/forgot-password');
        }
    }, [searchParams, router]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Kiểm tra mật khẩu mới và xác nhận mật khẩu
        if (newPassword !== confirmPassword) {
            message.error('Mật khẩu mới và xác nhận mật khẩu không khớp');
            return;
        }

        // Kiểm tra độ dài mật khẩu mới
        if (newPassword.length < 6) {
            message.error('Mật khẩu mới phải có ít nhất 6 ký tự');
            return;
        }

        resetPassword(
            { resetToken: token, newPassword },
            {
                onSuccess: () => {
                    message.success('Đặt lại mật khẩu thành công!');
                    // Chuyển về trang đăng nhập
                    setTimeout(() => {
                        router.push('/auth/login');
                    }, 2000);
                },
                onError: (error: any) => {
                    const errorMessage = error.response?.data?.message || 'Đặt lại mật khẩu thất bại!';
                    message.error(errorMessage);
                },
            }
        );
    };

    const EyeIcon = ({ show, onClick }: { show: boolean; onClick: () => void }) => (
        <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600" onClick={onClick}>
            {show ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L12 12m-2.122-2.122L7.758 7.758M12 12l2.122-2.122m-2.122 2.122L9.878 14.122m2.122-2.122L14.122 7.758"
                    />
                </svg>
            ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            )}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Đặt lại mật khẩu</h1>

                <p className="text-sm text-gray-600 text-center mb-6">Nhập mật khẩu mới cho tài khoản của bạn</p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Mật khẩu mới */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
                        <div className="relative mt-1">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                            <EyeIcon show={showNewPassword} onClick={() => setShowNewPassword(!showNewPassword)} />
                        </div>
                    </div>

                    {/* Xác nhận mật khẩu mới */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu mới</label>
                        <div className="relative mt-1">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                            <EyeIcon show={showConfirmPassword} onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                        </div>
                    </div>

                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isPending}>
                        {isPending ? 'Đang đặt lại...' : 'Đặt lại mật khẩu'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button onClick={() => router.push('/auth/login')} className="text-blue-600 hover:underline text-sm">
                        ← Quay lại đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
