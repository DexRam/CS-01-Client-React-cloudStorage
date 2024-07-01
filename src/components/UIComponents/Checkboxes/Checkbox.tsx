import { FC } from 'react';

interface CheckboxProps {
    isChecked: boolean;
    onChange: () => void;
}

const Checkbox: FC<CheckboxProps> = ({ isChecked, onChange }) => (
    <div className="relative mb-2">
        <input
            type="checkbox"
            checked={isChecked}
            onChange={onChange}
            className="w-6 h-6 border-2 border-gray-300 rounded-full checked:bg-blue-500 focus:outline-none transition duration-300 cursor-pointer"
            onClick={(event) => event.stopPropagation()}
        />
    </div>
);

export default Checkbox;
