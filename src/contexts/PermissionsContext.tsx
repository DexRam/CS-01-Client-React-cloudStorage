import { createContext, useContext, useState, ReactNode, FC } from 'react';

interface Permissions {
    isAdmin: boolean;
    setIsAdmin: (access: boolean) => void;
}

export const PermissionsContext = createContext<Permissions | undefined>(undefined);

interface PermissionsProviderProps {
    children: ReactNode;
}

export const PermissionsProvider: FC<PermissionsProviderProps> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    return (
        <PermissionsContext.Provider value={{ isAdmin, setIsAdmin }}>
            {children}
        </PermissionsContext.Provider>
    );
};

export const usePermissions = () => {
    const context = useContext(PermissionsContext);
    if (context === undefined) {
        throw new Error('usePermissions must be used within a PermissionsProvider');
    }
    return context;
};