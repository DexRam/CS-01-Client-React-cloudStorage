import { useEffect, useState } from 'react';
import { getPermissions } from '../API/User';
import { usePermissions } from '../contexts/PermissionsContext';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const { setIsAdmin } = usePermissions();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('accessToken');
            setIsAuthenticated(!!token);
            if (token) {
                const permissions = await getPermissions(token);
                setIsAdmin(permissions.isAdmin);
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