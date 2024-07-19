import { createContext, ReactNode, FC, useState } from 'react';

export interface UserContextProps {
    isAdmin: boolean;
    setIsAdmin: (access: boolean) => void;
    userId: number;
    setUserId: (id: number) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [userId, setUserId] = useState<number>(0);

    return (
        <UserContext.Provider value={{ isAdmin, setIsAdmin, userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};