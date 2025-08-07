import { useMutation } from '@tanstack/react-query';
import { resetPassword, ResetPasswordPayload } from '@/lib/api/auth.api';

export const useResetPassword = () => {
    return useMutation({
        mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
        retry: false, // Không retry để tránh cache issues
    });
};
