export type     Comment = {
    _id: string;
    content: string;
    author: {
        _id: string;
        email: string;
        name: string;
    };
    post: string;
    parentComment: string | null;
    replies: string[];
    likeCount: number;
    likedBy: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
};
