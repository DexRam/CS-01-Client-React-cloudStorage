import { FC, useState } from "react";
import {
  handleDownload,
  handleRename,
  handleDelete,
  handleShare,
} from "../File/FileHandling";
import { ContentContainer, ActionContainer } from "../UIComponents/Containers";
import { ActionButton } from "../UIComponents/Actions";
import FileCard from "../File/FileCard";
import { files } from "../Additional/devData";

const FileManagement: FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());

  const toggleFileSelection = (fileId: number) => {
    setSelectedFiles((prevSelectedFiles) => {
      const updatedSelection = new Set(prevSelectedFiles);
      if (updatedSelection.has(fileId)) {
        updatedSelection.delete(fileId);
      } else {
        updatedSelection.add(fileId);
      }
      return updatedSelection;
    });
  };

  const handleAction = (action: (fileId: number) => void) => {
    selectedFiles.forEach(action);
    setSelectedFiles(new Set());
  };

  const actionButtons = [
    {
      label: "Download Selected",
      onClick: () => handleAction(handleDownload),
      color: "bg-green-500",
      hoverColor: "bg-green-600",
    },
    {
      label: "Delete Selected",
      onClick: () => handleAction(handleDelete),
      color: "bg-red-500",
      hoverColor: "bg-red-600",
    },
  ];

  return (
    <ContentContainer>
      <ActionContainer>
        {actionButtons.map(({ label, onClick, color, hoverColor }, index) => (
          <ActionButton key={index} onClick={onClick} color={color} hoverColor={hoverColor}>
            {label}
          </ActionButton>
        ))}
      </ActionContainer>
      <div className="flex flex-wrap">
        {files.map((file) => (
          <FileCard
            key={file.fileId}
            file={file}
            isSelected={selectedFiles.has(file.fileId)}
            onToggleSelect={toggleFileSelection}
            onDownload={handleDownload}
            onRename={handleRename}
            onDelete={handleDelete}
            onShare={handleShare}
            showCheckbox
          />
        ))}
      </div>
    </ContentContainer>
  );
};

export default FileManagement;
