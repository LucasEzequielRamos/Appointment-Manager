import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginUserForm from "@/Components/Forms/LoginUserForm";

const page = async () => {
  const session = await auth();
  console.log({ session });
  if (session) redirect("/home");
  return (
    <div>
      <LoginUserForm />
    </div>
  );
};

export default page;
