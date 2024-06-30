import Image from "next/image";
import { Inter } from "next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { AuthContext } from "./_app";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { value } = useContext(AuthContext);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <p>{value}</p>

        <div>
          <button className="m-5" onClick={() => signIn("github")}>
            Sign in
          </button>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    </main>
  );
}
