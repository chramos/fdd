import React from "react";

type HeadingProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};
const Heading = ({
  size = "md",
  children,
}: React.PropsWithChildren<HeadingProps>) => {
  return React.createElement(
    {
      xs: "h5",
      sm: "h4",
      md: "h3",
      lg: "h2",
      xl: "h1",
    }[size],
    {
      className: `font-extrabold text-gray-900 ${sizeMap[size]}`,
    },
    children
  );
};

export default Heading;

const sizeMap = {
  xs: "text-md",
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};
