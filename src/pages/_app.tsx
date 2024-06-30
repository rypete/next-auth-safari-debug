import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider refetchOnWindowFocus refetchInterval={150}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
