import { FC, ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  passwordVisible?: boolean;
  setPasswordVisible?: (visible: boolean) => void;
}

const InputField: FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  onBlur,
  onKeyPress,
  error,
  required = false,
  passwordVisible,
  setPasswordVisible,
}) => {
  const getInputBorderClass = (): string => {
    if (!value) return "";
    if (error) return "border-red-500";
    return "border-green-500";
  };

  return (
    <label className="flex flex-col relative">
      <span className="mb-2 font-medium">{label}:</span>
      <input
        type={
          passwordVisible !== undefined
            ? passwordVisible
              ? "text"
              : "password"
            : type
        }
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        className={`p-2 border rounded focus:outline-none focus:ring cursor-pointer ${getInputBorderClass()}`}
        required={required}
      />
      {setPasswordVisible && (
        <button
          type="button"
          onClick={() => setPasswordVisible(!passwordVisible)}
          className="absolute right-3 top-10 focus:outline-none"
        >
          {passwordVisible ? "🙉" : "🙈"}
        </button>
      )}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </label>
  );
};

export default InputField;
