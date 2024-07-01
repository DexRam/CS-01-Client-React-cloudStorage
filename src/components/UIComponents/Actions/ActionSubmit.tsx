import { FC, ReactNode } from "react";

interface SubmitButtonProps {
  isFormValid: boolean;
  color: string;
  hoverColor: string;
  children: ReactNode;
}

const ActionSubmit: FC<SubmitButtonProps> = ({
  isFormValid,
  color,
  hoverColor,
  children,
}) => {
  return (
    <button
      type="submit"
      className={`p-2 rounded transition-colors cursor-pointer ${isFormValid
        ? `${color} text-white hover:${hoverColor}`
        : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
      disabled={!isFormValid}
    >
      {children}
    </button>
  );
};

export default ActionSubmit;
