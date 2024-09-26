"use client";

import { signIn } from "next-auth/react";

const SignInGoogleButton = () => {
  return (
    <div>
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl:
              "http://localhost:3000/api/auth/callback/google?action=login",
          })
        }
      >
        {" "}
        LOGIN WITH GOOGLE
      </button>
    </div>
  );
};

export default SignInGoogleButton;
