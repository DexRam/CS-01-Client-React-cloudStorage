import { FC, useEffect, useState } from "react";
import { getUserFiles } from "../../API/Files";
import {
  handleDownload,
  handleRename,
  handleDelete,
  handleShare,
} from "../File/FileHandling";
import { uploadFiles } from "../../API/Files";
import { ContentContainer, ActionContainer } from "../UIComponents/Containers";
import { ActionButton } from "../UIComponents/Actions";
import Dropzone from "../File/Dropzone";
import FileCard from "../File/FileCard";

const FileManagement: FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await getUserFiles();
      setFiles(files);
    };
    fetchFiles();
  }, []);

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
    <Dropzone onFilesAdded={(files: FileList) => uploadFiles(files)}>
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
              key={file.id}
              file={file}
              isSelected={selectedFiles.has(file.id)}
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
    </Dropzone>
  );
};

export default FileManagement;
