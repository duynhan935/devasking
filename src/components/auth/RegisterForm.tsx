/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/hooks/auth/useRegister';
import { App } from 'antd';

const RegisterForm = () => {
    const router = useRouter();
    const { message } = App.useApp();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { mutate, isPending, isSuccess, isError, error } = useRegister();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            message.error('Mật khẩu không khớp');
            return;
        }

        mutate(
            {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            },
            {
                onSuccess: () => {
                    message.success('Đăng ký thành công!');
                    setTimeout(() => {
                        router.push('/auth/login');
                    }, 1500);
                },
                onError: (error: any) => {
                    message.error(error.response?.data?.message || 'Đăng ký thất bại');
                },
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Tên người dùng</label>
                <input type="text" name="name" className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input type="email" name="email" className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Mật khẩu</label>
                <input type="password" name="password" className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 mb-2">Xác nhận mật khẩu</label>
                <input type="password" name="confirmPassword" className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.confirmPassword} onChange={handleChange} required />
            </div>

            <button type="submit" disabled={isPending} className={`w-full text-white py-2 rounded-md transition ${isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}>
                {isPending ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>

            {isError && <p className="text-red-500 text-sm mt-4">Lỗi: {(error as any)?.response?.data?.message || 'Có lỗi xảy ra'}</p>}
            {isSuccess && <p className="text-green-600 text-sm mt-4">🎉 Đăng ký thành công!</p>}
        </form>
    );
};

export default RegisterForm;
