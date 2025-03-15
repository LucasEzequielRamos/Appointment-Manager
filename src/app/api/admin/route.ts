import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const adminsFound = await db.user.findMany({
      where: { role: "ADMIN" },
      
    });

    // console.log(usersFound)

    if (!adminsFound) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    return NextResponse.json({
      message: "Professionals founded successfully",
      professional: adminsFound,
      status: 200,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: "Error getting admins",
      error: error.message,
      status: 500,
    });
  }
}
