import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();

  return (
    <main>
      <div>
        <p>status: {status}</p>
        {status == "authenticated" && (
          <p>Pretty timestamp: {new Date(data.user.generated).toUTCString()}</p>
        )}
        {status == "authenticated" && <p>Timestamp: {data.user.generated}</p>}
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
