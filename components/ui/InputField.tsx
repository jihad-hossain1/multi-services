import React from "react";

interface InputFieldProps {
  label?: string;
  error?: string | undefined;
  type: string;
  name: string;
  id: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
  labelClassName?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  defaultValue?: string | number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  id,
  autoComplete = "off",
  className = "input-form",
  labelClassName = "input-label",
  required = false,
  onChange,
  value,
  defaultValue,
  error,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className={labelClassName}>
        <span>{label}</span>
        <span className={required ? "text-red-500" : "hidden"}>*</span>
      </label>
      <input
        autoComplete={autoComplete}
        type={type}
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        className={className}
        required={required}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export  {InputField};
