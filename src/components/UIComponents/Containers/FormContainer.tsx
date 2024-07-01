import { FC, ReactNode, FormEvent } from "react";

interface FormContainerProps {
  children: ReactNode;
  handleSubmit: (event: FormEvent) => void;
}

const FormContainer: FC<FormContainerProps> = ({
  children,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      {children}
    </form>
  );
};

export default FormContainer;
