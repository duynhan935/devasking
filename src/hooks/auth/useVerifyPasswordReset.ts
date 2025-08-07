import { useMutation } from '@tanstack/react-query';
import { verifyPasswordReset, VerifyPasswordResetPayload } from '@/lib/api/auth.api';

export const useVerifyPasswordReset = () => {
    return useMutation({
        mutationFn: (payload: VerifyPasswordResetPayload) => verifyPasswordReset(payload),
    });
};
