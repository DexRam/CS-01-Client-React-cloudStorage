import { FC, ReactNode } from "react";

interface ContentContainerProps {
  children: ReactNode;
}

const ContentContainer: FC<ContentContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-r from-blue-500 to-teal-500">
      {children}
    </div>
  );
};

export default ContentContainer;
