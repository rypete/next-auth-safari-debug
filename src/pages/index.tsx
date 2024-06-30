import Image from "next/image";
import { Inter } from "next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, status } = useSession();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <p>status: {status}</p>
        {status == "authenticated" && (
          <p>Pretty timestamp: {new Date(data.user.generated).toUTCString()}</p>
        )}
        {status == "authenticated" && <p>Timestamp: {data.user.generated}</p>}
        {status == "authenticated" && <p>Expires: {data.user.expires}</p>}
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
