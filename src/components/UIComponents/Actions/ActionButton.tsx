import { FC, ReactNode } from "react";

interface ActionButtonProps {
  onClick: () => void;
  color: string;
  hoverColor: string;
  children: ReactNode;
}

const ActionButton: FC<ActionButtonProps> = ({
  onClick,
  color,
  hoverColor,
  children,
}) => (
  <button
    className={`${color} text-white py-2 px-4 mx-1 mt-4 rounded hover:${hoverColor} transition duration-300`}
    onClick={(event) => {
      event.stopPropagation();
      onClick();
    }}
  >
    {children}
  </button>
);

export default ActionButton;
