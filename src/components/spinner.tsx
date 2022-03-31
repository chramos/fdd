import React from "react";

type SpinnerProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  colorScheme?: "info" | "warning" | "danger" | "success" | "light" | "default";
};
const Spinner = ({ size = "md", colorScheme = "default" }: SpinnerProps) => {
  return (
    <svg
      className={`${sizeMap[size]} ${colorMap[colorScheme]} animate-spin`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className={colorMap[colorScheme]}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export default Spinner;

const sizeMap = {
  xs: "w-2 h-2",
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
};

const colorMap = {
  info: "text-blue-500",
  warning: "text-yellow-500",
  danger: "text-red-500",
  success: "text-green-500",
  light: "text-white",
  default: "text-indigo-500",
};
