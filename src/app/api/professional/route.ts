import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const professionalsFound = await db.user.findMany({
      where: { role: "PROFESSIONAL" },
      include: {
        professional: {
          include: {
            services: {
              include: {
                availability: {
                  include: {
                    time_slot: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // console.log(usersFound)

    if (!professionalsFound) {
      return NextResponse.json({ message: "User not found", status: 400 });
    }

    return NextResponse.json({
      message: "Professionals founded successfully",
      professional: professionalsFound,
      status: 201,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: "Error getting professionals",
      error: error.message,
      status: 500,
    });
  }
}
