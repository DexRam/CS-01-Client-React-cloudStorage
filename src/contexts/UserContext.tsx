import { createContext, useContext, useState, ReactNode, FC } from 'react';

interface UserContextProps {
    isAdmin: boolean;
    setIsAdmin: (access: boolean) => void;
    userId: number;
    setUserId: (id: number) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserContextProviderProps {
    children: ReactNode;
}

export const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [userId, setUserId] = useState<number>(0);

    return (
        <UserContext.Provider value={{ isAdmin, setIsAdmin, userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
};