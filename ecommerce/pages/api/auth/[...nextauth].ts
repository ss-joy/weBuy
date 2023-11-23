import connectToDB from "@/utils/database";
import User from "@/models/user-model";
import { compare } from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { UserSignUpSchema } from "@/schemas/user-signup-schema";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userEmail: { label: "Enter your email", type: "email" },
        userPwd: { label: "Your password", type: "password" },
      },
      async authorize(credentials, req) {
        UserSignUpSchema.omit({
          userConfirmPwd: true,
          userName: true,
        }).parse(credentials);

        await connectToDB();

        const userFound = await User.findOne({
          email: credentials?.userEmail,
        });

        if (!userFound) {
          // throw new Error("User is not registered");ts gives error
          return null;
        }
        const pwdMatches = await compare(
          credentials?.userPwd as string,
          userFound.password
        );
        if (!pwdMatches) {
          // throw new Error("invalid credentials");
          return null;
        }
        if (pwdMatches) {
          const user = {
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
          };
          return user;
        }
        /**
         * for solving ts error
         */
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // console.log(token);
      // console.log(account);
      // console.log(profile);
      if (account && profile) {
        token.user_id = token.sub;
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log("session", session);
      // console.log("token", token);
      // console.log("user", user);
      /**
       * solve ts error for user_id
       */
      //@ts-ignore
      session.user!.user_id = token.sub;
      return session;
    },
  },
  /**
   * fix logged in period
   */
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60, //2 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
