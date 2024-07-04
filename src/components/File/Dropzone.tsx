import React, { FC, useCallback, useState } from 'react';

interface IDropzoneProps {
    children?: React.ReactNode;
    onFilesAdded: (files: FileList) => void;
}

const Dropzone: FC<IDropzoneProps> = ({ children, onFilesAdded }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setShowTooltip(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setShowTooltip(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        if (files.length) {
            onFilesAdded(files);
        }
        setShowTooltip(false);
    }, [onFilesAdded]);

    return (
        <div
            className="relative"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {children}
            {showTooltip && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 pointer-events-none">
                    <img src="/src/assets/upload.png" alt="Upload" className="w-2/5 h-auto" />
                </div>
            )}
        </div>
    );
};

export default Dropzone;
