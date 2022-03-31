import React from "react";
import Heading from "./heading";
import Row from "./row";

type TwoColumnsLayoutProps = {
  label: string;
};
const TwoColumnsLayout = ({
  label,
  children,
}: React.PropsWithChildren<TwoColumnsLayoutProps>) => {
  return (
    <Row className="items-center">
      <div className="w-1/5">
        <span className="font-medium">{label}</span>
      </div>
      <div className="w-1/2">{children}</div>
    </Row>
  );
};

export default TwoColumnsLayout;
