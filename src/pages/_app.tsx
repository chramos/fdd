import Header from "components/header";
import type { AppProps } from "next/app";
import AuthProvider from "providers/auth-provider";
import queryClient from "query-client";
import { QueryClientProvider } from "react-query";
import "./_app.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
