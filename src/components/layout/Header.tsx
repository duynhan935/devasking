'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Avatar, Dropdown, MenuProps, Spin } from 'antd';
import { UserOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import { useUserStore } from '@/stores/useUserStore';
import { useUserProfile } from '@/hooks/profile/useGetProfile';

export default function Header() {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const clearUser = useUserStore((state) => state.clearUser);

    const { data, isLoading, error } = useUserProfile();

    useEffect(() => {
        if (data && !user) {
            setUser(data);
        }
        if (error) {
            clearUser();
        }
    }, [data, error]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        clearUser();
        window.location.href = '/auth/login';
    };

    const items: MenuProps['items'] = [
        {
            key: 'profile',
            label: <Link href={`/profile`}>Trang cá nhân</Link>,
            icon: <ProfileOutlined />,
        },
        {
            key: 'logout',
            label: <span onClick={handleLogout}>Đăng xuất</span>,
            icon: <LogoutOutlined />,
        },
    ];

    return (
        <header className="w-full bg-white shadow">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    DevShare <span className="text-gray-800">Lite</span>
                </Link>

                <nav className="flex items-center gap-6 text-sm">
                    {isLoading ? (
                        <Spin size="small" />
                    ) : user ? (
                        <>
                            <Link href="/posts/create" className="text-gray-700 hover:text-blue-600">
                                Đăng bài
                            </Link>

                            <Dropdown menu={{ items }} placement="bottomRight" arrow>
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size="small" />
                                    <span className="text-gray-700 hover:text-blue-600">{user.name}</span>
                                </div>
                            </Dropdown>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" className="text-gray-700 hover:text-blue-600">
                                Đăng nhập
                            </Link>
                            <Link href="/auth/register" className="text-gray-700 hover:text-blue-600">
                                Đăng ký
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
