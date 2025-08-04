'use client';

import { useParams } from 'next/navigation';
import CommentList from '@/components/comments/CommentList';
import { Spin } from 'antd';
import { useGetPostById } from '@/hooks/post/post.hooks';

export default function PostDetailPage() {
    const params = useParams();
    const id = params.slug as string;

    const { data: post, isLoading, isError, error } = useGetPostById(id);

    const fakeComments = [
        {
            id: 1,
            author: 'Minh Trần',
            content: 'Bài viết rất bổ ích, cảm ơn bạn!',
            replies: [
                { id: 11, author: 'Nguyễn Văn A', content: 'Cảm ơn bạn đã ủng hộ!' },
                { id: 12, author: 'Khánh Ly', content: 'Đồng ý, bài viết này dễ hiểu.' },
            ],
        },
        {
            id: 2,
            author: 'Hải Nam',
            content: 'Mình đang học useEffect, có tài liệu nào dễ hiểu không?',
            replies: [{ id: 21, author: 'Nguyễn Văn A', content: 'Bạn thử đọc tài liệu chính thức của React nhé!' }],
        },
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-60">
                <Spin />
            </div>
        );
    }

    if (isError || !post) {
        console.log(error);

        return <div className="text-center text-red-500 py-10">Không thể tải bài viết. Vui lòng thử lại sau.</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="text-sm text-gray-600 mb-4">Tác giả: {post.author?.name || 'Không rõ'}</p>
            <div className="text-base leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-md border">{post.content}</div>

            <CommentList initialComments={fakeComments} />
        </div>
    );
}
