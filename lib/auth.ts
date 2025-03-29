import { NextAuthOptions } from "next-auth";
import { PrivyProvider } from "@privy-io/react-auth";

declare module "next-auth" {
  interface User {
    id: string;
  }
  interface Session {
    user: User & {
      id: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "privy",
      name: "Privy",
      type: "oauth",
      wellKnown: "https://auth.privy.io/.well-known/openid-configuration",
      authorization: { params: { scope: "openid email profile" } },
      clientId: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
      clientSecret: process.env.PRIVY_APP_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
}; 