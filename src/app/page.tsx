import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) redirect("/home");
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>ESTE VA A SE NUSTRO PROYECTO</h1>
      <div className="flex flex-col gap-3">
        <Link
          className="p-3 bg-red-300 rounded-full text-center"
          href={"/auth/login"}
        >
          Login
        </Link>
        <Link
          className="p-3 bg-red-300 rounded-full text-center"
          href={"/auth/register"}
        >
          Register
        </Link>
      </div>
    </div>
  );
}
