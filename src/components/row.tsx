import React from "react";

type RowProps = {
  className?: string;
};
const Row = ({ children, className }: React.PropsWithChildren<RowProps>) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

export default Row;
