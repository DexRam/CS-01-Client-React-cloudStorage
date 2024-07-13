interface File {
    id: number;
    name: string;
    uploaded_at: string;
    share_link: string
    downloaded_at: string;
    comment: string;
}

interface FileCardProps {
    file: File;
    isSelected: boolean;
    showCheckbox: boolean;
    onToggleSelect: (fileId: number) => void;
    onSaveName: (fileId: number, name: string) => void;
    onDownload: (fileId: number, filename: string) => void;
    onDelete: (fileId: number) => void;
    onShare: (fileId: number) => void;
    onSaveComment: (fileId: number, comment: string) => void;
}

export type { File, FileCardProps };