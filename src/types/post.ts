// types/post.ts
export type Post = {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    status: 'draft' | 'published';
    author: {
        _id: string;
        name: string;
        email: string;
    };
    viewCount: number;
    likeCount: number;
    commentCount: number;
    createdAt: string;
    updatedAt: string;
};
