import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const clientsFound = await db.user.findMany({
      where: { role: "CLIENT" },
      include: {
        client: true
      },
    });

    // console.log(usersFound)

    if (!clientsFound) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    return NextResponse.json({
      message: "Professionals founded successfully",
      professional: clientsFound,
      status: 200,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: "Error getting clients",
      error: error.message,
      status: 500,
    });
  }
}
