import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async ({ children }: any) => {
  const session = await auth();

  if (!session || session?.user?.role !== "ADMIN") redirect("/home");
  return <>{children}</>;
};

export default page;
