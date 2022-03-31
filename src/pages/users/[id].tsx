import Column from "components/column";
import Heading from "components/heading";
import Spacing from "components/spacing";
import Spinner from "components/spinner";
import { getUser, PATH, updateUser } from "features/user/actions";
import UserForm from "features/user/components/user-form";
import useRequest from "hooks/use-request";
import { useRouter } from "next/router";
import React from "react";

type EditUserScreenProps = {};
const EditUserScreen = ({}: EditUserScreenProps) => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading } = useRequest(
    {
      requestFn: () => getUser({ userId: Number(id) }),
      requestKey: [PATH, id],
    },
    {
      enabled: Boolean(id),
    }
  );

  const { fetch, loading: saving } = useRequest(
    { requestFn: updateUser },
    {
      onSuccess: () => {
        router.back();
      },
    }
  );

  if (loading || !data) {
    return (
      <Column className="grow justify-center items-center">
        <Spinner size="xl" />
      </Column>
    );
  }

  return (
    <Column className="container mx-auto py-4 flex-1">
      <Heading size="xl">{data.name}</Heading>
      <Spacing size="xl" />
      {loading ? (
        <Column className=" max-w-md mx-auto flex-1 justify-center items-center pt-64">
          <Spinner size="xl" />
        </Column>
      ) : (
        <UserForm
          initialValues={data}
          loading={saving}
          onSubmit={(user) => {
            fetch(user);
          }}
        />
      )}
    </Column>
  );
};

export default EditUserScreen;
