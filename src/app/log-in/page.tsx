"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const router = useRouter();

  const handleLogIn = (e: any) => {
    e.preventDefault();
    console.log(userEmail);
    console.log(userPassword);
    signIn("credentials", {
      email: userEmail,
      password: userPassword,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="text-center">
      <h1>Iniciar sesion</h1>
      <form
        action=""
        onSubmit={handleLogIn}
        className="bg-gray-400 text-black flex flex-col items-center my-10"
      >
        <div className="flex flex-col ">
          <div className="flex flex-col">
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-amber-200"
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-amber-200"
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="my-10">
          <button type="submit" className="bg-amber-200 px-10">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default page;
