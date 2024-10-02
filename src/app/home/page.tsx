import { auth } from "@/auth";
import LogoutButton from "@/Components/LogoutButton";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  // console.log(session, "SESSION DESDE HOME");

  return (
    <div>
      <h1>Welcome, {session?.user?.name}</h1>
      <p>Email: {session?.user?.email}</p>

      <LogoutButton />
    </div>
  );
};

export default page;
