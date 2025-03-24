"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userPhoneNumber, setUserPhoneNumber] = useState<Number>();
  console.log(userEmail);
  console.log(userPassword);
  const router = useRouter();

  const sendInfo = async () => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",

        body: JSON.stringify({
          name: userName,
          email: userEmail,
          phoneNumber: userPhoneNumber,
          password: userPassword,
        }),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (!response.ok) {
        throw new Error(data.message || "Error en el registro");
      }

      router.push("/log-in");

      alert("Registro exitoso");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema con el registro");
    }
  };

  return (
    <div className="text-center">
      <h1>REGISTRARSE</h1>
      <form
        action=""
        className="bg-gray-400 text-black flex flex-col items-center my-10"
        onSubmit={(e) => {
          e.preventDefault();
          if (userEmail && userPassword) {
            sendInfo();
          } else {
            alert("Por favor, complete todos los campos");
          }
        }}
      >
        <div className="flex flex-col ">
          <div className="flex flex-col">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-amber-200"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
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
            <label htmlFor="email">Numero telefonico</label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              className="bg-amber-200"
              onChange={(e) => {
                setUserPhoneNumber(Number(e.target.value));
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
