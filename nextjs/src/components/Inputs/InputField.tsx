import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  register?: any;
  error?: FieldError;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; //Modificado aqui
  defaultValue?: string;
  onBlur?: () => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  name,
  type = "text",
  register,
  error,
  value,
  onChange,
  defaultValue,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-4 w-full md:w-1/4">
      <label className="text-xs text-gray-500">{label}</label>
      <input
        id={name}
        type={type}
        {...(typeof register === "function" ? register(name) : {value, onChange})} //Modificado aqui
        defaultValue={defaultValue}
        className="w-full ring-[1.5px] ring-gray-300 rounded-md p-2 text-sm"
        {...inputProps}
      />
      {error?.message && (
        <p className="text-xs text-red-500">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
