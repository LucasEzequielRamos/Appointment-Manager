import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const appointmentsFound = await db.appointment.findMany({
      include: {
        professional: {
          include: {
            user: true,
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

    if (!appointmentsFound) {
      return NextResponse.json({ message: "No appointments found", status: 404 });
    }

    return NextResponse.json({
      message: "Appointments successfully found",
      appointment: appointmentsFound,
      status: 200,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: "Error getting appointments",
      error: error.message,
      status: 500,
    });
  }
}