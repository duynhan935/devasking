import { useMutation } from '@tanstack/react-query';
import { verifyEmail } from '@/lib/api/auth.api';

export const useVerifyEmail = () => {
    return useMutation({
        mutationFn: (code: string) => verifyEmail(code),
    });
};
