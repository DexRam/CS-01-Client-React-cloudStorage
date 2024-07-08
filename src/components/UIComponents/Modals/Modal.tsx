import { FC, ChangeEvent, useState } from "react";
import { ActionButton } from "../Actions";
import { InputField } from "../InputFields";

interface ModalProps {
    label: string;
    content: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onClose: () => void;
    onSave: () => void;
}

const Modal: FC<ModalProps> = ({ label, onClose, onSave }) => {
    const [content, setContent] = useState<string>("");

    const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    }

    return (
        <div className={"flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-r from-blue-500 to-teal-500"}>
            <InputField label={label} type="text" value={content} onChange={handleContentChange} />
            <ActionButton onClick={onClose} color={"bg-red-500"} hoverColor={"bg-red-600"}>Close</ActionButton>
            <ActionButton onClick={onSave} color={"bg-green-500"} hoverColor={"bg-green-600"}>Save</ActionButton>
        </div>
    );
};

export default Modal;
