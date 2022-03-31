import React from "react";

type InputProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: HTMLInputElement["type"];
};
const Input = ({ value, onChange, placeholder, type }: InputProps) => {
  return (
    <input
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      placeholder={placeholder}
      type={type}
      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  );
};

export default Input;
