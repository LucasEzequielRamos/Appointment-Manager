import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";

const page = async ({ children }: any) => {
  const session = await auth();

  if (session && session?.user.role !== "ADMIN") redirect("/home");
  return <SessionProvider>{children}</SessionProvider>;
};

export default page;
