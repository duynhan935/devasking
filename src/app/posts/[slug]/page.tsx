'use client';
import { useParams } from 'next/navigation';
import CommentList from '@/components/comments/CommentList';

export default function PostDetailPage() {
    const { id } = useParams();

    const post = {
        id,
        title: 'Cách học React hiệu quả',
        author: 'Nguyễn Văn A',
        content: `React là một thư viện JavaScript mạnh mẽ dùng để xây dựng giao diện người dùng.

Để học hiệu quả, bạn nên bắt đầu với các khái niệm cơ bản như:
- Component
- Props
- State
- Hooks

Sau đó là các khái niệm nâng cao như:
- Context
- Redux
- Code splitting
- Performance optimization`,
    };

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

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="text-sm text-gray-600 mb-4">Tác giả: {post.author}</p>
            <div className="text-base leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-md border">{post.content}</div>

            <CommentList initialComments={fakeComments} />
        </div>
    );
}
