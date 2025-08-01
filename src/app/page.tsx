/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';

const fakePosts = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Bài viết ${i + 1}`,
    tags: ['React', 'Next.js'],
    content: `Nội dung bài viết số ${i + 1}...`,
}));

export default function HomePage() {
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const handleSearch = (e: any) => {};

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">DevShare Lite</h1>
            <input type="text" placeholder="Tìm kiếm bài viết..." className="w-full px-4 py-2 border border-gray-300 rounded mb-4" />
            <div className="space-y-4">
                {fakePosts.slice((page - 1) * pageSize, page * pageSize).map((item) => (
                    <div key={item.id} className="bg-white shadow p-4 rounded">
                        <a href={`/posts/${item.id}`} className="text-lg font-semibold hover:underline">
                            {item.title}
                        </a>
                        <div className="flex gap-2 mt-1">
                            {item.tags.map((tag) => (
                                <span key={tag} className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <p className="mt-2 text-sm text-gray-700">{item.content}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6 gap-2">
                {[...Array(Math.ceil(fakePosts.length / pageSize)).keys()].map((p) => (
                    <button key={p} onClick={() => setPage(p + 1)} className={`px-3 py-1 rounded border ${page === p + 1 ? 'bg-blue-600 text-white' : 'bg-white'}`}>
                        {p + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
