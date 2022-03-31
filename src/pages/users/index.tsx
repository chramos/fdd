import Button from "components/button";
import Column from "components/column";
import Heading from "components/heading";
import Row from "components/row";
import Spacing from "components/spacing";
import Spinner from "components/spinner";
import Table from "components/table";
import { deleteUser, getUsers, PATH } from "features/user/actions";
import DeleteUserButton from "features/user/components/delete-user-button";
import useRequest from "hooks/use-request";
import { useRouter } from "next/router";

type UsersScreenProps = {};
const UsersScreen = ({}: UsersScreenProps) => {
  const router = useRouter();

  const { data, loading } = useRequest(
    {
      requestFn: getUsers,
      requestKey: PATH,
    },
    { refetchOnMount: false }
  );

  return (
    <Column className="container mx-auto py-4 flex-1">
      <Heading>Usuários do sistema</Heading>
      <Spacing size="lg" />
      {loading || !data ? (
        <Column className=" max-w-md mx-auto flex-1 justify-center items-center pt-64">
          <Spinner size="xl" />
        </Column>
      ) : (
        <Table
          data={data}
          columns={[
            { dataKey: "name", header: "Nome", width: "30%" },
            { dataKey: "email", header: "E-mail", width: "20%" },
            { dataKey: "phone", header: "Telefone", width: "50%" },
            {
              header: "",
              dataKey: "",
              actions: (user) => {
                return (
                  <Row>
                    <Button
                      colorScheme="light"
                      label="Editar"
                      variant="ghost"
                      onClick={() => router.push(`/users/${user.id}`)}
                    />
                    <Spacing size="xs" />
                    <DeleteUserButton user={user} />
                  </Row>
                );
              },
            },
          ]}
        />
      )}
    </Column>
  );
};

export default UsersScreen;
