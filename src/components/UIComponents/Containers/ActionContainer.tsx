import { FC, ReactNode } from "react";

interface ActionContainerProps {
  children: ReactNode;
}

const ActionContainer: FC<ActionContainerProps> = ({ children }) => {
  return <div className="flex flex-wrap justify-around">{children}</div>;
};

export default ActionContainer;
