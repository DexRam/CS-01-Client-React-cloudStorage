import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/useUserContext';
import { useAuth } from './useAuth';

export const useAuthRedirect = (target: string) => {
    const isAuthenticated = useAuth();
    const navigate = useNavigate();
    const { userId } = useUserContext();

    useEffect(() => {
        const shouldRedirect = isAuthenticated && userId && target !== '/';
        const shouldNavigateToHome = !isAuthenticated && target === '/';

        if (shouldRedirect) {
            navigate(target);
        } else if (shouldNavigateToHome) {
            navigate('/');
        }
    }, [isAuthenticated, navigate, target]);
};

