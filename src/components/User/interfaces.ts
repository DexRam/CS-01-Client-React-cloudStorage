interface User {
    id: number;
    username: string;
    fullname: string
    email: string;
    is_admin: string;
    filepath: string;
    files_count: number;
    files_size: number;
}

interface UserCardProps {
    user: User;
    onDeleteUser: (userId: number) => void;
    onToggleUserRole: (userId: number) => void;
    onManageUserFiles: (userid: number) => void;
}

export type { User, UserCardProps };