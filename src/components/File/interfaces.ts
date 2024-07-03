interface File {
    fileId: number;
    fileName: string;
    fileSize: number;
    fileType: string;
    creationDate: string;
    modificationDate: string;
    filePath: string;
    fileOwner: number;
    accessPermissions: string;
    metadata: {
        tags: string[];
        description: string;
    };
}

interface FileCardProps {
    file: File;
    isSelected: boolean;
    showCheckbox: boolean;
    onToggleSelect: (fileId: number) => void;
    onDownload: (fileId: number) => void;
    onRename: (fileId: number) => void;
    onDelete: (fileId: number) => void;
    onShare: (fileId: number) => void;
}

export type { File, FileCardProps };