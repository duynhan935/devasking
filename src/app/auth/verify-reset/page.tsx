import VerifyResetCodeForm from '@/components/auth/VerifyResetCodeForm';
import { Suspense } from 'react';

export default function VerifyResetPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyResetCodeForm />
        </Suspense>
    );
}
