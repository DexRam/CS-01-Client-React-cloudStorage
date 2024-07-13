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
      className={`text-white py-2 px-4 mx-1 mt-4 rounded cursor-pointer transition duration-300 ${isFormValid
        ? `${color} hover:${hoverColor}`
        : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
      disabled={!isFormValid}
    >
      {children}
    </button >
  );
};

export default ActionSubmit;
