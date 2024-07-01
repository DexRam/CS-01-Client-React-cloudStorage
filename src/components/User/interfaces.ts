import { File } from "../File/interfaces";

interface User {
    userId: number;
    userName: string;
    userFullname: string
    userEmail: string;
    userRole: string;
    storagePath: string;
}

interface UserCardProps {
    user: User;
    isSelected: boolean;
    onUserClick: (userId: number) => void;
    onDeleteUser: (userId: number) => void;
    onToggleUserRole: (userId: number) => void;
    files: File[];
    onDownload: (fileId: number) => void;
    onRename: (fileId: number) => void;
    onDelete: (fileId: number) => void;
    onShare: (fileId: number) => void;
    showCheckbox: boolean;
}

export type { User, UserCardProps };