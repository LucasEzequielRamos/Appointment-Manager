import { auth } from "@/auth";
import LogoutButton from "@/Components/Buttons/LogoutButton";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <div className="flex flex-col items-start p-2 gap-4">
      <h1>Bienvenido, {session?.user?.name}</h1>
      <p>Email: {session?.user?.email}</p>
      <Link href={`dashboard/${session.user.id}`}>
        Ir a Dashboard de {session.user.role}
      </Link>
      <LogoutButton />
    </div>
  );
};

export default page;
