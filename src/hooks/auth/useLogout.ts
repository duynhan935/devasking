import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '@/lib/api/auth.api';

export const useLogout = () => {
    return useMutation({
        mutationFn: logoutUser,
    });
};
