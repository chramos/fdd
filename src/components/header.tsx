import { signOut } from "features/authentication/actions";
import useRequest from "hooks/use-request";
import { useAuth } from "providers/auth-provider";
import React from "react";
import Button from "./button";

type HeaderProps = {};
const Header = ({}: HeaderProps) => {
  const { authenticated } = useAuth();
  const { fetch, loading } = useRequest({ requestFn: signOut });

  return (
    <header className="bg-gray-50 p-4 border-b border-gray-200 sticky top-0">
      <div className="container flex items-center justify-between mx-auto">
        <span>FDD - Feature Driven Development</span>
        {authenticated ? (
          <Button label="Sair" onClick={fetch} loading={loading} />
        ) : null}
      </div>
    </header>
  );
};

export default Header;
