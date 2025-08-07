/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useVerifyPasswordReset } from '@/hooks/auth/useVerifyPasswordReset';
import { App } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';

const VerifyResetCodeForm = () => {
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const { mutate: verifyCode, isPending } = useVerifyPasswordReset();
    const { message } = App.useApp();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const emailParam = searchParams.get('email');
        if (emailParam) {
            setEmail(emailParam);
        } else {
            router.push('/auth/forgot-password');
        }
    }, [searchParams, router]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        verifyCode(
            { email, code },
            {
                onSuccess: (data) => {
                    message.success('Mã xác thực đúng!');
                    // Chuyển đến trang reset password với token (kiểm tra cả 2 field)
                    const token = data.resetToken || data.token;
                    router.push(`/auth/reset-password?token=${token}`);
                },
                onError: (error: any) => {
                    const errorMessage = error.response?.data?.message || 'Mã xác thực không đúng!';
                    message.error(errorMessage);
                },
            }
        );
    };

    const handleResendCode = () => {
        // Quay lại trang forgot password để gửi lại mã
        router.push('/auth/forgot-password');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Xác thực mã</h1>

                <p className="text-sm text-gray-600 text-center mb-6">
                    Nhập mã xác thực đã được gửi đến email: <br />
                    <span className="font-medium text-blue-600">{email}</span>
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mã xác thực</label>
                        <input
                            type="text"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest"
                            placeholder="000000"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            maxLength={6}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isPending}>
                        {isPending ? 'Đang xác thực...' : 'Xác thực'}
                    </button>
                </form>

                <div className="mt-6 text-center space-y-2">
                    <button onClick={handleResendCode} className="text-blue-600 hover:underline text-sm">
                        Không nhận được mã? Gửi lại
                    </button>
                    <br />
                    <button onClick={() => router.push('/auth/login')} className="text-gray-600 hover:underline text-sm">
                        ← Quay lại đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyResetCodeForm;
