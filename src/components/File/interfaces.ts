interface File {
    Id: number;
    name: string;
}

interface FileCardProps {
    file: File;
    isSelected: boolean;
    showCheckbox: boolean;
    // onToggleSelect: (fileId: number) => void;
    onDownload: (fileId: number) => void;
    onRename: (fileId: number) => void;
    onDelete: (fileId: number) => void;
    onShare: (fileId: number) => void;
}

export type { File, FileCardProps };