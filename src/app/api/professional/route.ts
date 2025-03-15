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

    if (!professionalsFound) {
      return NextResponse.json({ message: "No users found", status: 404 });
    }

    return NextResponse.json({
      message: "Professionals successfully found",
      professional: professionalsFound,
      status: 200,
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
