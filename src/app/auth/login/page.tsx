import React from "react";
import LoginForm from "./form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  console.log({ session });
  if (session) redirect("/home");
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
