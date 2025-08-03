import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/lib/api/user.api';

export const useUserProfile = () => {
    return useQuery({
        queryKey: ['user-profile'],
        queryFn: getUserProfile,
        staleTime: 1000 * 60 * 5, 
        retry: 1,
    });
};
