"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

function NewVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);
  return (
    <div>
      <h1>Verification form</h1>
    </div>
  );
}

export default NewVerificationForm;
