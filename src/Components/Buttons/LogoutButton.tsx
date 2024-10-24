"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button onClick={() => signOut({ redirect: true, redirectTo: "/" })}>
      Sign Out
    </button>
  );
};

export default LogoutButton;
