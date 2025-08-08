/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spin, Input } from 'antd';
import { usePostsWithSearch } from '@/hooks/post/post.hooks';

const { Search } = Input;

export default function Posts() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const pageSize = 5;
    const router = useRouter();

    const { data: posts, isLoading, isSearching, hasNextPage, hasPrevPage } = usePostsWithSearch(searchQuery, page, pageSize);

    

    const handleClickPost = (postId: string) => {
        router.push(`/posts/${postId}`);
    };

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setPage(1); // Reset về trang đầu khi search
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setPage(1);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 pt-24">
            <h1 className="text-2xl font-bold mb-4">DevShare Lite</h1>

            {/* Search Input với Ant Design */}
            <Search
                placeholder="Tìm kiếm bài viết..."
                allowClear
                onSearch={handleSearch}
                onChange={(e) => {
                    if (!e.target.value) {
                        handleClearSearch();
                    }
                }}
                style={{ marginBottom: 16 }}
                size="large"
            />

            {/* Hiển thị trạng thái */}
            {isSearching && searchQuery && (
                <div className="mb-4 text-sm text-gray-600">
                    Kết quả tìm kiếm cho: &ldquo;<strong>{searchQuery}</strong>&rdquo;
                </div>
            )}

            {isLoading ? (
                <div className="flex justify-center items-center py-10">
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {posts && posts.length > 0 ? (
                            posts.map((item: any) => (
                                <div key={item._id} onClick={() => handleClickPost(item._id)} className="bg-white shadow p-4 rounded cursor-pointer hover:shadow-md transition">
                                    <div className="text-lg font-semibold text-blue-600 hover:underline">{item.title}</div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-500">{isSearching ? 'Không tìm thấy bài viết nào phù hợp' : 'Chưa có bài viết nào'}</div>
                        )}
                    </div>

                    {/* Pagination với logic thông minh */}
                    {posts && posts.length > 0 && (
                        <div className="flex justify-center mt-6 gap-2">
                            <button onClick={() => setPage(page - 1)} disabled={!hasPrevPage} className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                                Trước
                            </button>
                            <span className="px-3 py-1">Trang {page}</span>
                            <button onClick={() => setPage(page + 1)} disabled={!hasNextPage} className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                                Sau
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
