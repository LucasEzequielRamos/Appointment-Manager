import Link from "next/link";
import LogoutButton from "../Buttons/LogoutButton";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-base-300 text-neutral shadow-lg p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href={!session ? "/" : "/home"}>
            {session ? "Home" : "My App"}
          </Link>
          {session && (
            <Link
              href={`/dashboard/${session?.user.id}`}
              className="text-primary font-semibold hover:text-secondary"
            >
              Dashboard
            </Link>
          )}
        </div>

        {session ? (
          <div className="flex items-center space-x-4">
            <span className="text-neutral">
              Hola, {session.user?.name || session.user?.email}
            </span>
            <LogoutButton />
          </div>
        ) : (
          <Link href={"/auth/login"}> Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
