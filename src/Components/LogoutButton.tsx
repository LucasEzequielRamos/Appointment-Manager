"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button
      onClick={() =>
        signOut({ redirect: false, redirectTo: "/api/auth/signin" })
      }
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
