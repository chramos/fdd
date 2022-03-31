import useRequest from "hooks/use-request";
import React from "react";
import Column from "components/column";
import SignInForm from "features/authentication/components/sign-in-form";
import { signIn } from "features/authentication/actions";
import Heading from "components/heading";
import Spacing from "components/spacing";
import Text from "components/text";

type SignInProps = {};
const SignIn = ({}: SignInProps) => {
  const { fetch, loading } = useRequest(
    { requestFn: signIn },
    {
      onError: (error: any) => {
        alert(error.message);
      },
    }
  );
  return (
    <Column className="max-w-md h-screen justify-center mx-auto">
      <Column className=" bg-white py-8 px-4 shadow rounded-md w-96">
        <Heading>Sign In</Heading>
        <span className="text-gray-400">Welcome to FDD example</span>
        <Spacing />
        <SignInForm
          loading={loading}
          onSubmit={(credentials) => {
            fetch(credentials);
          }}
        />
      </Column>
    </Column>
  );
};

export default SignIn;
