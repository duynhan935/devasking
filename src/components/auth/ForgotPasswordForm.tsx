/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRequestPasswordReset } from '@/hooks/auth/useRequestPasswordReset';
import { App } from 'antd';
import { useRouter } from 'next/navigation';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const { mutate: requestReset, isPending } = useRequestPasswordReset();
    const { message } = App.useApp();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        requestReset(
            { email },
            {
                onSuccess: () => {
                    message.success('Đã gửi mã xác thực đến email của bạn!');
                    router.push(`/auth/verify-reset?email=${encodeURIComponent(email)}`);
                },
                onError: (error: any) => {
                    const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại!';
                    message.error(errorMessage);
                },
            }
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Quên mật khẩu</h1>

                <p className="text-sm text-gray-600 text-center mb-6">Nhập email của bạn và chúng tôi sẽ gửi mã xác thực để đặt lại mật khẩu</p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isPending}>
                        {isPending ? 'Đang gửi...' : 'Gửi mã xác thực'}
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

export default ForgotPasswordForm;
