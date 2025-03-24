"use client";

import { SignOut } from "@/actions/signout-button";
import { signOut } from "next-auth/react";
import React from "react";
import Link from "next/link";

function Navbar() {
  const handleClick = async () => {
    await signOut({ redirect: "/login" });
    console.log("hola");
  };

  return (
    <div className="text-white text-lg ">
      Navbar
      <button onClick={() => handleClick()}>Sign Out</button>
      <Link href="/log-in">Log In</Link>
      <Link href="/sign-up">Sign Up</Link>
    </div>
  );
}

export default Navbar;
