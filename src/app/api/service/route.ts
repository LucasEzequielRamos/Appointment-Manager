import { type NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { TimeSlot, WeekDay } from '@prisma/client';

type DayAvailability = {
  day: WeekDay;            
  time_slot: TimeSlot;  
};



export async function POST(req: NextRequest) {
  try {
    const {  email, name, coverage,duration, availability  } = await req.json()
    console.log(email,name,coverage,duration,availability)

    if (!email|| !name|| !coverage||!duration|| !availability ) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios.' }, {status:400});
    }

    const userFound = await db.user.findUnique({
      where: { email: email },
    });
   
    if(!userFound || userFound.role !== 'PROFESSIONAL'){
        return NextResponse.json({ error: 'No existe un usuario profesional con ese correo electronico', status:400})
    }

    const newService = await db.service.create({
        data: {
          name: name,
          duration: duration,
          coverage: coverage,
          professional: { connect: { professional_id: userFound?.user_id } },
          availability: {
            create: availability.map((avail: any) => ({
              day: avail.day,
              time_slot:{ create: avail.time_slot}
            }))
          },
        }
      });


    return NextResponse.json({ message: 'Service added created successfully', user: userFound }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: 'Error creating professional user',
      error: error.message,
    }, { status: 500 });
  }
}

