import User from "@/models/User";
import bcrypt from "bcrypt";
import { AuthOptions, DefaultUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    firstName: string;
    lastName: string;
  }

  interface Session {
    user: User;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Missing Credentials");
        }

        const user = await User.findOne({ email: credentials.email }).select(
          "firstName lastName email id password"
        );

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordEqual = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordEqual) {
          throw new Error("Invalid Password");
        }

        return user;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? null;
        token.email = user.email ?? null;
        token.firstName = user.firstName ?? null;
        token.lastName = user.lastName ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
      };
      return session;
    },
  },
};
