import { FC, useEffect, useState } from "react";
import { File } from "../File/interfaces";
import { getUserFiles, downloadFile, uploadFiles, changeFileComment, changeFileName, shareFile, deleteFile } from "../../API/Files";
import { ContentContainer, ActionContainer } from "../UIComponents/Containers";
import { ActionButton } from "../UIComponents/Actions";
import Dropzone from "../File/Dropzone";
import FileCard from "../File/FileCard";


const FileManagement: FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const fetchedFiles = await getUserFiles();
    setFiles(fetchedFiles);
  };

  const handleDownload = async (fileId: number, filename: string) => {
    await downloadFile(fileId, filename)
    fetchFiles()
  }

  const handleFileUpload = async (files: FileList) => {
    await uploadFiles(files);
    fetchFiles();
  };

  const handleSaveName = async (fileId: number, newName: string) => {
    await changeFileName(fileId, newName);
    fetchFiles();
  };

  const handleShare = async (fileid: number) => {
    await shareFile(fileid)
    fetchFiles();
  }

  const handleDelete = async (fileId: number) => {
    await deleteFile(fileId);
    fetchFiles();
  };

  const handleSaveComment = async (fileId: number, newComment: string) => {
    await changeFileComment(fileId, newComment);
    fetchFiles();
  };

  const toggleFileSelection = (fileId: number) => {
    setSelectedFiles(prevSelectedFiles => {
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
    <Dropzone onFilesAdded={handleFileUpload}>
      <ContentContainer>
        <ActionContainer>
          {actionButtons.map(({ label, onClick, color, hoverColor }, index) => (
            <ActionButton key={index} onClick={onClick} color={color} hoverColor={hoverColor}>
              {label}
            </ActionButton>
          ))}
        </ActionContainer>
        {files.map(file => (
          <FileCard
            key={file.id}
            file={file}
            isSelected={selectedFiles.has(file.id)}
            onToggleSelect={toggleFileSelection}
            onSaveName={handleSaveName}
            onDownload={handleDownload}
            onDelete={handleDelete}
            onShare={handleShare}
            onSaveComment={handleSaveComment}
            showCheckbox
          />
        ))}
      </ContentContainer>
    </Dropzone>
  );
};

export default FileManagement;
