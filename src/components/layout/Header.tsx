'use client';
import Link from 'next/link';

const username = "john-doe";

export default function Header() {



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
                    <Link href={`/profile/${username}`} className="text-gray-700 hover:text-blue-600">
                        Trang cá nhân
                    </Link>
                    <Link href="/auth/login" className="text-gray-700 hover:text-blue-600">
                        Đăng nhập
                    </Link>
                    <Link href="/auth/register" className="text-gray-700 hover:text-blue-600">
                        Đăng ký
                    </Link>
                </nav>
            </div>
        </header>
    );
}
