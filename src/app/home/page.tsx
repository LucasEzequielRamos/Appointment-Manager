import { auth } from "@/auth";
import React from "react";

const page = async () => {
  const session = await auth();

  console.log(session, "SESSION DESDE HOME");

  return (
    <div>
      <p>Home page</p>
    </div>
  );
};

export default page;
