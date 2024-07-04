import { FC, MouseEvent } from "react";
import { Checkbox } from "../UIComponents/Checkboxes";
import { CardContainer, ActionContainer } from "../UIComponents/Containers";
import { CardHeader, CardBody } from "../UIComponents/Cards";
import { ActionButton } from "../UIComponents/Actions";
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
}) => {
  const handleCardClick = (event: MouseEvent) => {
    if (["BUTTON", "INPUT"].includes((event.target as HTMLElement).tagName)) return;
    onToggleSelect(file.id);
  };

  const actions = [
    { label: "Download", handler: onDownload, color: "bg-green-500", hoverColor: "bg-green-600" },
    { label: "Rename", handler: onRename, color: "bg-blue-500", hoverColor: "bg-blue-600" },
    { label: "Share", handler: onShare, color: "bg-yellow-500", hoverColor: "bg-yellow-600" },
    { label: "Delete", handler: onDelete, color: "bg-red-500", hoverColor: "bg-red-600" },
  ];

  // const fileDetails = [
  //   `Size: ${file.fileSize} bytes`,
  //   `Created: ${new Date(file.creationDate).toLocaleString()}`,
  //   `Modified: ${new Date(file.modificationDate).toLocaleString()}`,
  //   `Access: ${file.accessPermissions}`,
  //   `Tags: ${file.metadata.tags.join(", ")}`,
  //   `Description: ${file.metadata.description}`,
  // ];

  return (
    <CardContainer isSelected={isSelected} onClick={handleCardClick}>
      {showCheckbox && (
        <Checkbox isChecked={isSelected} onChange={() => onToggleSelect(file.id)} />
      )}
      <CardHeader title={file.name} />
      {/* {fileDetails.map((detail, index) => (
        <CardBody key={index} text={detail} />
      ))} */}
      <ActionContainer>
        {actions.map(({ label, handler, color, hoverColor }, index) => (
          <ActionButton
            key={index}
            onClick={() => handler(file.id)}
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
