import { type NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import bcrypt from 'bcrypt'

export async function POST (req: NextRequest) {
  try {
    const data = await req.json()

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
        role: 'CLIENT', 
        first_name: data.first_name,
        last_name: data.last_name,
      },
    });

    await db.clientProfile.create({
      data: {
        client_id: newUser.user_id,
        address: data.address
      },
    });

    return NextResponse.json({ message: 'Client user created successfully', user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: 'Error creating user',
      error: error.message,
    }, { status: 500 });
  }
}
