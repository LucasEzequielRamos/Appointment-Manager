import { type NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { saltAndHashPassword } from '@/utils/helpers';


export async function POST(req: NextRequest) {
  try {
    const { first_name, last_name, email, password } = await req.json()


    if (!first_name || !last_name || !email || !password   ) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios.' ,status:400});
    }

    const userFound = await db.user.findUnique({
      where: { email: email },
    });

    if (userFound) {
      return NextResponse.json({ message: 'User already exists' , status: 400 });
    }


    const hashedPassword = await saltAndHashPassword(password)

    const newUser = await db.user.create({
      data: {
        email: email,
        password: hashedPassword,
        role: 'PROFESSIONAL',
        first_name: first_name,
        last_name: last_name,
        professional: {
          create: {
           
          },
        },
      },
    });

    return NextResponse.json({ message: 'Professional user created successfully', user: newUser , status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: 'Error creating professional user',
      error: error.message,
    status: 500 });
  }
}
