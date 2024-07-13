import { FC } from "react";

interface ModalProps {
    children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
            {children}
        </div>
    );
};

export default Modal;
