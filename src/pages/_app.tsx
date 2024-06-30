import "@/styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const AuthContext = createContext<{
  setValue: (n: number) => void;
  value: number;
}>({ value: 0, setValue: () => {} });

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [value, setValue] = useState(0);

  const memo = useMemo(() => ({ value, setValue }), [value]);

  return <AuthContext.Provider value={memo}>{children}</AuthContext.Provider>;
};

const DirtyHook = () => {
  const { setValue } = useContext(AuthContext);
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setValue(data.user.generated);
    }
  }, [setValue, data, status]);
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
    <AuthContextProvider>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </AuthContextProvider>
  );
}
