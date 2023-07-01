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
          s: "sadasdas",
          lol: "sadasd",
        };
      },
    }),
  ],
});

export default handler;
