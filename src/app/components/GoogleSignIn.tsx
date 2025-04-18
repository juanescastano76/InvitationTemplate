import React from "react";
import { signIn } from "next-auth/react";
import { text } from "stream/consumers";

function GoogleSignIn({ text }: { text: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg px-6 py-3 shadow hover:shadow-md transition-all duration-200"
      onClick={() =>
        signIn("google", {
          callbackUrl: "/dashboard",
        })
      }
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span className="text-sm font-medium text-gray-700">{text}</span>
    </button>
  );
}

export default GoogleSignIn;
