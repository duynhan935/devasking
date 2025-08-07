import { useMutation } from '@tanstack/react-query';
import { requestPasswordReset, RequestPasswordResetPayload } from '@/lib/api/auth.api';

export const useRequestPasswordReset = () => {
    return useMutation({
        mutationFn: (payload: RequestPasswordResetPayload) => requestPasswordReset(payload),
    });
};
