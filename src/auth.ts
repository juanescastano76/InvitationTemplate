import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import getDataFromDB from "./lib/getDataFromDB";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: any) => {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) throw new Error("Faltan credenciales");

        const user = await getDataFromDB(email, password);

        if (!user) throw new Error("Credenciales inválidas");

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
});
