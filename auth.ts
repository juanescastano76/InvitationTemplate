import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
import saltAndHashPassword from "@/lib/utils";
import credentials from "next-auth/providers/credentials";
import getDataFromDB from "@/lib/getDataFromDB";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials: any) => {
        let user = null;
        let password = credentials.password;
        // logic to salt and hash password

        let userEmail: string = credentials.email;

        user = await getDataFromDB(userEmail, password);
        console.log("usuario front", user);

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          // throw new Error("Invalid credentials.");
          console.log("error");
        }

        // return user object with their profile data
        console.log("usuario logueado");

        return user;
      },
    }),
  ],
});
