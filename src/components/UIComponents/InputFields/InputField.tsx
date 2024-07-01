import { FC, ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: string;
  required?: boolean;
  passwordVisible?: boolean;
  setPasswordVisible?: (visible: boolean) => void;
}

const InputField: FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
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
