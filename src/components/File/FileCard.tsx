import React, { FC, MouseEvent, useState, ChangeEvent } from "react";
import { Checkbox } from "../UIComponents/Checkboxes";
import { CardContainer, ActionContainer } from "../UIComponents/Containers";
import { CardHeader, CardBody } from "../UIComponents/Cards";
import { ActionButton } from "../UIComponents/Actions";
import { InputField } from "../UIComponents/InputFields";
import { FileCardProps } from "./interfaces";

const FileCard: FC<FileCardProps> = ({
  file,
  isSelected,
  showCheckbox,
  onToggleSelect,
  onDownload,
  onRename,
  onDelete,
  onShare,
  onSaveComment,
}) => {
  const [comment, setComment] = useState(file.comment);

  const handleCardClick = (event: MouseEvent) => {
    if (["BUTTON", "INPUT"].includes((event.target as HTMLElement).tagName)) return;
    onToggleSelect(file.id);
  };

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleCommentSave = () => {
    if (comment !== file.comment) {
      onSaveComment(file.id, comment);
    }
  };

  const handleCommentKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCommentSave();
      event.currentTarget.blur();
    }
  };

  const actions = [
    { label: "Download", handler: () => onDownload(file.id), color: "bg-green-500", hoverColor: "bg-green-600" },
    { label: "Rename", handler: () => onRename(file.id), color: "bg-blue-500", hoverColor: "bg-blue-600" },
    { label: "Share", handler: () => onShare(file.id), color: "bg-yellow-500", hoverColor: "bg-yellow-600" },
    { label: "Delete", handler: () => onDelete(file.id), color: "bg-red-500", hoverColor: "bg-red-600" },
  ];

  return (
    <CardContainer isSelected={isSelected} onClick={handleCardClick}>
      {showCheckbox && (
        <Checkbox isChecked={isSelected} onChange={() => onToggleSelect(file.id)} />
      )}
      <CardHeader title={file.name} />
      <CardBody text={`Uploaded at: ${file.uploaded_at}`} />
      {file.share_link && <CardBody text={`Share link: ${file.share_link}`} />}
      {file.downloaded_at && <CardBody text={`Downloaded at: ${file.downloaded_at}`} />}

      <InputField
        label="Comment"
        type="text"
        value={comment}
        onChange={handleCommentChange}
        onBlur={handleCommentSave}
        onKeyPress={handleCommentKeyPress}
      />

      <ActionContainer>
        {actions.map(({ label, handler, color, hoverColor }, index) => (
          <ActionButton
            key={index}
            onClick={handler}
            color={color}
            hoverColor={hoverColor}
          >
            {label}
          </ActionButton>
        ))}
      </ActionContainer>
    </CardContainer>
  );
};

export default FileCard;
