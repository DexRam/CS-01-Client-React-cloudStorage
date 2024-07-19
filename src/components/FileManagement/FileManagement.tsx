import { useParams } from "react-router-dom";
import { FC, useCallback, useEffect, useState } from "react";
import { File } from "../File/interfaces";
import { getUserFiles, downloadFile, uploadFiles, changeFileComment, changeFileName, shareFile, deleteFile } from "../../API/Files";
import { ContentContainer, ActionContainer } from "../UIComponents/Containers";
import { ActionButton } from "../UIComponents/Actions";
import Dropzone from "../File/Dropzone";
import FileCard from "../File/FileCard";



const FileManagement: FC = () => {
  const { userId } = useParams();
  const userIdNumber = Number(userId);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());

  const fetchFiles = useCallback(async () => {
    const fetchedFiles = await getUserFiles(userIdNumber);
    setFiles(fetchedFiles);
  }, [userIdNumber]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleDownload = async (fileId: number) => {
    const file = files.find(f => f.id === fileId);
    if (file) {
      await downloadFile(fileId, file.name);
      fetchFiles();
    }
  };

  const handleUpload = async (files: FileList) => {
    await uploadFiles(userIdNumber, files);
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

  const handleSaveName = async (fileId: number, newName: string) => {
    await changeFileName(fileId, newName);
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
    <Dropzone onFilesAdded={handleUpload}>
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
