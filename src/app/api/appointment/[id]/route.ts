import { NextRequest, NextResponse} from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
    try {
        const { id } = await params;
        const appointmentId = Number(id);

        if (!id) {
            return NextResponse.json({ message: "Appointment ID is required", status: 400})
        } else if (isNaN(appointmentId)) {
            return NextResponse.json({ message: "Appointment ID must be a number", status: 400})
        }

        const appointmentFound = await db.appointment.findUnique({
            where: { id: appointmentId },
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
        })
    
        if (!appointmentFound) {
            return NextResponse.json({ message: "Appointment not found", status: 404 });
        }
    
        return NextResponse.json({
            message: "Appointment successfully found",
            appointment: appointmentFound,
            status: 200,
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({
            message: "Error getting appointment",
            error: error.message,
            status: 500,
        });
    }
}