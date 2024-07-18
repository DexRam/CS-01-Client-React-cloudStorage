import { useEffect, useState } from 'react';
import { getMe } from '../API/User';
import { useUserContext } from '../contexts/UserContext';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const { setIsAdmin, setUserId } = useUserContext();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('accessToken');
            setIsAuthenticated(!!token);
            if (token) {
                const me = await getMe();
                setIsAdmin(me.is_admin);
                setUserId(me.id);
            }
        };

        checkAuth();

        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, [setIsAdmin]);

    return isAuthenticated;
};