'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Mật khẩu không khớp');
            return;
        }
        alert('Duyệt');
        console.log('Form submitted:', formData);
        setTimeout(() => {
            router.push('/auth/login');
        }, 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
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

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                    Đăng ký
                </button>
            </form>
        </div>
    );
};

export default Register;
