import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";

const page = async () => {
  const session = await auth();

  console.log(session, "SESSION DESDE HOME");

  return (
    <div>
      <h1>Welcome, {session?.user?.name}</h1>
      <p>Email: {session?.user?.email}</p>

      <LogoutButton />
    </div>
  );
};

export default page;
