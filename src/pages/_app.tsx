import "@/styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { PropsWithChildren, useEffect, useState } from "react";

const DirtyHook = () => {
  useSession();

  return null;
};

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  });

  if (!loaded) {
    return <p>not yet</p>;
  }

  return (
    <SessionProvider refetchOnWindowFocus refetchInterval={150}>
      <DirtyHook />
      {children}
    </SessionProvider>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
