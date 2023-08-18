import connectToDB from "@/utils/database";
import User from "@/models/user-model";
import NextAuth from "next-auth";
import { compare } from "bcrypt";
import Providers from "next-auth/providers";

const handler = NextAuth({
  session: {
    jwt: true,
  },

  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        await connectToDB();

        const foundUser = await User.findOne({
          email: credentials.email,
        }).exec();

        if (!foundUser) {
          throw new Error("You dont have an accout.Sign up first");
        }

        const passMatches = await compare(
          credentials.password,
          foundUser.password
        );
        if (!passMatches) {
          throw new Error("invalid Credentials");
        }
        console.log(typeof foundUser.id);
        return {
          email: foundUser.email,
          id: foundUser.id,
        };
      },
    }),
  ],

  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (user) {
        token.user_id = user.id;
      }

      return token;
    },
    async session(session, token) {
      //this token is da token passed from jwt func

      //maybe await database here to get the user id
      session.user.user_id = token.user_id;
      return session;
    },
  },
});

export default handler;
