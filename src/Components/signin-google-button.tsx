"use client";

import { signIn } from "next-auth/react";

const SignInGoogleButton = () => {
  return (
    <div>
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: "http://localhost:3000/home",
          })
        }
        className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
      >
        {" "}
        LOGIN WITH GOOGLE
      </button>
    </div>
  );
};

export default SignInGoogleButton;
