import Button from "components/button";
import useRequest from "hooks/use-request";
import React from "react";
import { UserType } from "types/user-type";
import { deleteUser } from "../actions";

type DeleteUserButtonProps = {
  user: UserType;
};
const DeleteUserButton = ({ user }: DeleteUserButtonProps) => {
  const { fetch, loading: deleting } = useRequest({ requestFn: deleteUser });

  return (
    <Button
      colorScheme="danger"
      label="Excluir"
      variant="ghost"
      loading={deleting}
      onClick={() => {
        if (confirm(`Tem certeza que deseja remover ${user.name}?`)) {
          fetch(user);
        }
      }}
    />
  );
};

export default DeleteUserButton;
