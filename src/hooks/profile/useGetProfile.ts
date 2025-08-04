import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/lib/api/user.api';
import { useEffect, useState } from 'react';

export const useUserProfile = () => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setEnabled(true);
        }
    }, []);

    return useQuery({
        queryKey: ['user-profile'],
        queryFn: getUserProfile,
        staleTime: 1000 * 60 * 5,
        retry: 1,
        enabled,
    });
};
