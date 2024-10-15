import { type NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { saltAndHashPassword } from "@/utils/password"


export async function POST (req: NextRequest) {
  try {
    const { first_name, last_name, email, password, address, phone, coverage } = await req.json()

    if(!email) return NextResponse.json({ error: 'El mail es obligatorio.' }, { status: 400 });
    
    
    const userFound = await db.user.findUnique({
      where: { email: email },
    });

    if (userFound) {
      return NextResponse.json({ message: 'User already exists', status: 400 });
    }

    if (!first_name || !last_name || !password || !address || !phone || !coverage) {
      return NextResponse.json({ message: 'Todos los campos son obligatorios', status: 400 });
    }

    const isAdmin = email === 'lucas@admin.com' ?  'ADMIN' : 'CLIENT'

    const hashedPassword = await saltAndHashPassword(password)

    const newUser = await db.user.create({
      data: {
        email: email,
        password: hashedPassword, 
        role: isAdmin, 
        first_name: first_name,
        last_name: last_name,
        client:{
          create:{
            address: address,
            phone: phone,
            coverage: coverage
          }
        } 
      },
    });


    return NextResponse.json({ message: 'Client user created successfully', user: newUser , status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: 'Error creating user',
      error: error.message,
    }, { status: 500 });
  }
}
