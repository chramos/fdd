import React from "react";

type FormType = {
  onSubmit?: () => void;
};
const Form = ({ children, onSubmit }: React.PropsWithChildren<FormType>) => {
  return (
    <form
      className="flex flex-col grow"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.();
      }}
    >
      {children}
    </form>
  );
};

export default Form;
