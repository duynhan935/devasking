import { useQuery } from '@tanstack/react-query';
import { getMyPosts } from '@/lib/api/post.api';
import { Post } from '@/types/post';
import { useEffect, useState } from 'react';

export const useMyPosts = () => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setEnabled(true);
        }
    }, []);

    return useQuery<Post[]>({
        queryKey: ['my-posts'],
        queryFn: getMyPosts,
        enabled,
    });
};
