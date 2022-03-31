import Button from "components/button";
import Form from "components/form";
import Input from "components/input";
import Row from "components/row";
import Spacing from "components/spacing";
import TwoColumnsLayout from "components/two-columns-layout";
import useForm from "hooks/use-form";
import { useRouter } from "next/router";
import React from "react";
import { UserType } from "types/user-type";

type UserFormProps = {
  initialValues?: UserType;
  onSubmit?: (user: Partial<UserType>) => void;
  loading?: boolean;
};
const UserForm = ({ initialValues, onSubmit, loading }: UserFormProps) => {
  const router = useRouter();
  const { getValue, setValue, submit, isDirty } = useForm({
    initialValues,
    onSubmit,
  });
  return (
    <Form onSubmit={submit}>
      <TwoColumnsLayout label="Nome">
        <Input
          placeholder="Nome"
          value={getValue("name")}
          onChange={(value) => setValue("name", value)}
        />
      </TwoColumnsLayout>
      <Spacing size="xl" />
      <TwoColumnsLayout label="Email">
        <Input
          placeholder="Email"
          value={getValue("email")}
          onChange={(value) => setValue("email", value)}
        />
      </TwoColumnsLayout>
      <Spacing size="xl" />
      <TwoColumnsLayout label="Telefone">
        <Input
          placeholder="Telefone"
          value={getValue("phone")}
          onChange={(value) => setValue("phone", value)}
        />
      </TwoColumnsLayout>

      <Spacing size="lg" />
      <div className="w-full border-b" />
      <Spacing />
      <Row className=" justify-end">
        <Button label="Voltar" colorScheme="light" onClick={router.back} />
        <Spacing />
        <Button
          label="Salvar"
          disabled={!isDirty}
          loading={loading}
          type="submit"
        />
      </Row>
    </Form>
  );
};

export default UserForm;
