import Button from "components/button";
import Form from "components/form";
import Input from "components/input";
import Spacing from "components/spacing";
import Spinner from "components/spinner";
import React from "react";
import useForm from "../../../hooks/use-form";
import { CredentialsType } from "../../../types/credentials-type";

type SignInFormProps = {
  onSubmit?: (credentials: CredentialsType) => void;
  loading?: boolean;
};
const SignInForm = ({ onSubmit, loading }: SignInFormProps) => {
  const { getValue, setValue, submit } = useForm<CredentialsType>({
    initialValues: {
      username: "admin@example.com",
      password: "123456",
    },
    onSubmit,
  });
  return (
    <Form onSubmit={submit}>
      <Input
        placeholder="Nome de usuário"
        value={getValue("username")}
        onChange={setValue("username")}
      />
      <Spacing />
      <Input
        placeholder="Senha"
        value={getValue("password")}
        onChange={setValue("password")}
        type="password"
      />
      <Spacing />
      <Button label="Entrar" loading={loading} type="submit" />
    </Form>
  );
};

export default SignInForm;
