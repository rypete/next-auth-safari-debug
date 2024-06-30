import NextAuth from "next-auth";
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
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.generated = Date.now();
        session.user.expires = token.expires as number;
      }

      return session;
    },
    jwt: async ({ token, account }) => {
      if (token && account) {
        token.expires = Date.now() + 1000 * 60 * 0.5;
      }

      if ((token.expires as number) <= Date.now()) {
        token.expires = Date.now() + 1000 * 60 * 0.5;
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        maxAge: 1 * 24 * 60 * 60,
        httpOnly: true,
        sameSite: "strict",
        path: "/api/auth",
        secure: true,
      },
    },
    callbackUrl: {
      name: "next-auth.callback-url",
      options: {
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "strict",
        path: "/api/auth",
        secure: true,
      },
    },
  },
});
