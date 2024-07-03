import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const useAuthRedirect = (target: string) => {
    const isAuthenticated = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const shouldRedirect = isAuthenticated && target !== '/';
        const shouldNavigateToHome = !isAuthenticated && target === '/';

        if (shouldRedirect) {
            navigate(target);
        } else if (shouldNavigateToHome) {
            navigate('/');
        }
    }, [isAuthenticated, navigate, target]);
};

