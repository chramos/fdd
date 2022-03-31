import React from "react";

type ColumnProps = {
  className?: string;
};
const Column = ({
  children,
  className,
}: React.PropsWithChildren<ColumnProps>) => {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
};

export default Column;
