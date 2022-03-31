import React from "react";
import Spinner from "./spinner";

type ColorScheme =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "danger"
  | "warning"
  | "info";
interface ButtonProps {
  label: string;
  icon?: React.ReactNode;
  colorScheme?: ColorScheme | "light";
  variant?: "solid" | "outline" | "ghost";
  loading?: boolean;
  disabled?: boolean;
  shape?: "pill" | "rounded";
  onClick?: () => void;
  grow?: boolean;
  type?: "button" | "submit";
}

const Button = ({
  label,
  icon,
  colorScheme = "primary",
  variant = "solid",
  loading,
  disabled,
  shape = "rounded",
  onClick,
  grow,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      onClick={() => {
        if (loading) {
          return;
        }
        onClick?.();
      }}
      disabled={disabled}
      type={type}
      className={`
      relative
      ${grow ? "w-full" : ""}
      ${
        shape === "pill" ? "rounded-full" : "rounded-md"
      } transition-all flex justify-center border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 sm:col-start-2 sm:text-sm ${
        classMap[colorScheme][variant]
      } disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 flex items-center disabled:border-gray-200`}
    >
      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center">
          {/* @ts-ignore */}
          <Spinner colorScheme={spinnerColorMap[colorScheme][variant]} />
        </div>
      ) : null}

      {icon}
      <div className={loading ? "opacity-0" : ""}>{label}</div>
    </button>
  );
};

export default Button;

const spinnerColorMap = {
  primary: {
    solid: "light",
    outline: "primary",
    ghost: "primary",
  },
  secondary: {
    solid: "light",
    outline: "secondary",
    ghost: "secondary",
  },
  accent: {
    solid: "light",
    outline: "accent",
    ghost: "accent",
  },
  success: {
    solid: "light",
    outline: "success",
    ghost: "success",
  },
  danger: {
    solid: "light",
    outline: "danger",
    ghost: "danger",
  },
  warning: {
    solid: "light",
    outline: "warning",
    ghost: "warning",
  },
  info: {
    solid: "light",
    outline: "info",
    ghost: "info",
  },
  light: {
    solid: "default",
    outline: "default",
    ghost: "default",
  },
};

const classMap = {
  primary: {
    solid: `bg-indigo-500 border-indigo-500 hover:bg-indigo-800 text-white focus:ring-indigo-200`,
    outline:
      "bg-transparent border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white focus:ring-indigo-200",
    ghost:
      "bg-transparent border-transparent border-0 shadow-none hover:bg-indigo-50 text-indigo-500",
  },
  secondary: {
    solid: `bg-blue-500 border-transparent hover:bg-blue-800 text-white focus:ring-blue-200`,
    outline:
      "bg-transparent border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-200",
    ghost:
      "bg-transparent border-transparent border-0 shadow-none hover:bg-blue-50 text-blue-500",
  },
  accent: {
    solid: `bg-rose-500 border-transparent hover:bg-rose-800 text-white focus:ring-rose-200`,
    outline:
      "bg-transparent border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white focus:ring-rose-200",
    ghost:
      "bg-transparent border-transparent border-0 shadow-none hover:bg-rose-50 text-rose-500",
  },
  success: {
    solid: `bg-green-500 border-transparent hover:bg-green-800 text-white focus:ring-green-200`,
    outline:
      "bg-transparent border-green-500 text-green-500 hover:bg-green-500 hover:text-white focus:ring-green-200",
    ghost:
      "bg-transparent border-transparent border-0 shadow-none hover:bg-green-50 text-green-500",
  },
  danger: {
    solid: `bg-red-500 border-transparent hover:bg-red-800 text-white focus:ring-red-200`,
    outline:
      "bg-transparent border-red-500 text-red-500 hover:bg-red-500 hover:text-white focus:ring-red-200",
    ghost:
      "bg-transparent border-transparent border-0 shadow-none hover:bg-red-50 text-red-500",
  },
  warning: {
    solid: `bg-yellow-500 border-transparent hover:bg-yellow-800 text-white focus:ring-yellow-200`,
    outline:
      "bg-transparent border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white focus:ring-yellow-200",
    ghost:
      "bg-transparent border-transparent border-0 shadow-none hover:bg-yellow-50 text-yellow-500",
  },
  info: {
    solid: `bg-sky-500 border-transparent hover:bg-sky-800 text-white focus:ring-sky-200`,
    outline:
      "bg-transparent border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white focus:ring-sky-200",
    ghost:
      "bg-transparent border-transparent border-0 shadow-none hover:bg-sky-50 text-sky-500",
  },
  light: {
    solid: `bg-white border-gray-300 hover:bg-gray-100 focus:ring-gray-400`,
    outline:
      "bg-transparent border-gray-200 hover:bg-gray-100 focus:ring-gray-400",
    ghost:
      "bg-transparent border-0 hover:bg-gray-100 focus:ring-gray-400 shadow-none",
  },
};
