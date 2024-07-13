import React, { FC, MouseEvent, useState, ChangeEvent } from "react";
import { Checkbox } from "../UIComponents/Checkboxes";
import { CardContainer, ActionContainer } from "../UIComponents/Containers";
import { CardBody } from "../UIComponents/Cards";
import { ActionButton } from "../UIComponents/Actions";
import { InputField } from "../UIComponents/InputFields";
import { FileCardProps } from "./interfaces";

const FileCard: FC<FileCardProps> = ({
  file,
  isSelected,
  showCheckbox,
  onToggleSelect,
  onDownload,
  onDelete,
  onShare,
  onSaveComment,
  onSaveName
}) => {
  const [comment, setComment] = useState(file.comment);
  const [name, setName] = useState(file.name);

  const handleCardClick = (event: MouseEvent) => {
    if (["BUTTON", "INPUT"].includes((event.target as HTMLElement).tagName)) return;
    onToggleSelect(file.id);
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) => setter(event.target.value);

  const handleKeyPress = (saveFn: () => void) =>
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        saveFn();
        event.currentTarget.blur();
      }
    };

  const handleNameSave = () => {
    if (name !== file.name) onSaveName(file.id, name);
  };

  const handleCommentSave = () => {
    if (comment !== file.comment) onSaveComment(file.id, comment);
  };

  const actions = [
    { label: "Download", handler: () => onDownload(file.id, file.name), color: "bg-green-500", hoverColor: "bg-green-600" },
    { label: file.share_link ? "Unshare" : "Share", handler: () => onShare(file.id), color: "bg-yellow-500", hoverColor: "bg-yellow-600" },
    file.share_link ? {
      label: "Copy Share Link",
      handler: () => {
        const fullLink = `http://127.0.0.1:8000/api/file/download-shared/${file.share_link}`;
        navigator.clipboard.writeText(fullLink);
      },
      color: "bg-blue-500",
      hoverColor: "bg-blue-600"
    } : null,
    { label: "Delete", handler: () => onDelete(file.id), color: "bg-red-500", hoverColor: "bg-red-600" },
  ];

  return (
    <CardContainer isSelected={isSelected} onClick={handleCardClick}>
      {showCheckbox && (
        <Checkbox isChecked={isSelected} onChange={() => onToggleSelect(file.id)} />
      )}
      <InputField
        label="Name"
        type="text"
        value={name}
        onChange={handleChange(setName)}
        onBlur={handleNameSave}
        onKeyPress={handleKeyPress(handleNameSave)}
      />


      <InputField
        label="Comment"
        type="text"
        value={comment}
        onChange={handleChange(setComment)}
        onBlur={handleCommentSave}
        onKeyPress={handleKeyPress(handleCommentSave)}
      />
      <CardBody text={`Uploaded at: ${file.uploaded_at}`} />
      {file.share_link && (
        <CardBody text={`Share link: http://127.0.0.1:8000/api/file/download-shared/${file.share_link}`} />
      )}
      {file.downloaded_at && <CardBody text={`Downloaded at: ${file.downloaded_at}`} />}
      <ActionContainer>
        {actions
          .filter((action): action is NonNullable<typeof action> => action !== null)
          .map(({ label, handler, color, hoverColor }, index) => (
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
