import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      if (session.user) {
        // @ts-ignore
        session.user.generated = Date.now();
      }
      return session;
    },
  },
});
