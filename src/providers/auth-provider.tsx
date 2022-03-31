import Spinner from "components/spinner";
import { useRouter } from "next/router";
import React from "react";

const AuthContext = React.createContext<{ authenticated?: boolean }>({
  authenticated: undefined,
});

type AuthProviderProps = {};
const AuthProvider = ({
  children,
}: React.PropsWithChildren<AuthProviderProps>) => {
  const [authenticated, setAuthenticated] = React.useState<boolean>();
  const router = useRouter();

  const checkAuth = async () => {
    const credentials: any = localStorage.getItem("credentials");
    if (!credentials) {
      await router.push("/sign-in");
      return setAuthenticated(false);
    }
    await router.push("/users");
    setAuthenticated(true);
  };

  React.useEffect(() => {
    checkAuth();
  }, []);

  React.useEffect(() => {
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  if (authenticated === undefined) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ authenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => React.useContext(AuthContext);
