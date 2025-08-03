'use client';

import Link from 'next/link';
import { useUserStore } from '@/stores/useUserStore';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';

export default function Header() {
    const user = useUserStore((state) => state.user);

    const clearUser = useUserStore((state) => state.clearUser);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        clearUser();
        window.location.href = '/auth/login';
    };

    const items: MenuProps['items'] = [
        {
            key: 'profile',
            label: <Link href={`/profile/${user?.id}`}>Trang cá nhân</Link>,
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
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    DevShare <span className="text-gray-800">Lite</span>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-6 text-sm">
                    <Link href="/posts/create" className="text-gray-700 hover:text-blue-600">
                        Đăng bài
                    </Link>

                    {user ? (
                        <Dropdown menu={{ items }} placement="bottomRight" arrow>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size="small" />
                                <span className="text-gray-700 hover:text-blue-600">{user.name}</span>
                            </div>
                        </Dropdown>
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
