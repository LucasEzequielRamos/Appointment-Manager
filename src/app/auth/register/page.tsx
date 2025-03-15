import { auth } from "@/auth";
import RegisterClientForm from "@/Components/Forms/RegisterClientForm";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();

  if (session && session?.user?.role !== "ADMIN") redirect("/home");
  return (
    <>
      <RegisterClientForm registratorRole={session?.user.role} />
    </>
  );
};

export default page;
