import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import getDataFromDB from "./lib/getDataFromDB";
import Google from "next-auth/providers/google";
import { connectDB } from "./lib/mongodb";
import User from "./models/User";
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
  callbacks: {
    async signIn({ user, account }) {
      const provider = account?.provider ?? "unknown";
      try {
        await connectDB();
        console.log("account", account);

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            email: user.email,
            password: "no",
            name: user.name || "Sin nombre",
            phoneNumber: 0,
            createdAt: new Date(),
            emailVerified: provider === "google" ? new Date() : null,
          });
        }

        return true;
      } catch (err) {
        console.error("Error al guardar usuario:", err);
        return false;
      }
    },
  },
});
