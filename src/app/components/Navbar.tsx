"use client";

import { signOut } from "next-auth/react";
import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <div className="text-white text-lg flex gap-10 ">
      <p>navrbar</p>
      <Link href="/log-in">Log In</Link>
      <Link href="/sign-up">Sign Up</Link>
    </div>
  );
}

export default Navbar;
