import { type NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import db from '@/lib/db';
import {  TimeSlot, WeekDay } from '@prisma/client';

type DayAvailability = {
  day: WeekDay;            
  timeSlots: TimeSlot[];  
};

export async function POST(req: NextRequest) {
  try {
    const { first_name, last_name, email, password, professionalProfile  } = await req.json()
    console.log(professionalProfile )

    if (!first_name || !last_name || !email || !password || !professionalProfile ) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios, incluyendo el perfil de cliente.' }, {status:400});
    }

    const userFound = await db.user.findUnique({
      where: { email: email },
    });

    if (userFound) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email: email,
        password: hashedPassword,
        role: 'PROFESSIONAL',
        first_name: first_name,
        last_name: last_name,
        professional: {
          create: {
            availability: {
              create: professionalProfile.availability.map((availability:DayAvailability) => ({
                day: availability.day,
                timeSlots: {
                  create: availability.timeSlots.map((slot: TimeSlot) => ({
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                  })),
                },
              })),
            },
          },
        },
      },
    });

    

    return NextResponse.json({ message: 'Professional user created successfully', user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: 'Error creating professional user',
      error: error.message,
    }, { status: 500 });
  }
}
