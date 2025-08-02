import { useMutation } from '@tanstack/react-query';
import { LoginPayload, LoginUser } from '@/lib/api/auth.api';

export const useLogin = () => {
    return useMutation({
        mutationFn: (payload: LoginPayload) => LoginUser(payload),
    });
};
