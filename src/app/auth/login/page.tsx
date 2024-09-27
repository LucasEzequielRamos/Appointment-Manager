import React from "react";
import LoginForm from "./form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (session) redirect("/home");
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
