import React from "react";
import RegisterForm from "./form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (session) redirect("/home");
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default page;
