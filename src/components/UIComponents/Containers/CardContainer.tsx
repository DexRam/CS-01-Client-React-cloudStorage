import { FC, ReactNode, MouseEventHandler } from "react";

interface CardContainerProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  isSelected?: boolean;
}

const CardContainer: FC<CardContainerProps> = ({ children, onClick, isSelected }) => {
  return (
    <div
      className={`items-center justify-center text-center p-10 m-10 bg-white rounded-lg shadow-lg min-w-96 ${onClick ? 'cursor-pointer rainbow-shadow' : ''} ${isSelected ? 'rainbow-shadow-holded' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CardContainer;
