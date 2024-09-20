import { type NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const userFound = await db.user.findUnique({
      where: { email: data.email },
    });

    if (userFound) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await db.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: 'PROFESSIONAL',
        first_name: data.first_name,
        last_name: data.last_name,
      },
    });

    await db.professionalProfile.create({
      data: {
        professional_id: newUser.user_id, 
        // TODO: add more fields
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
