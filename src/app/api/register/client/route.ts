import { type NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { saltAndHashPassword } from "@/utils/password"


export async function POST (req: NextRequest) {
  try {
    const { first_name, last_name, email, password, client } = await req.json()
    console.log(client)

    if (!first_name || !last_name || !email || !password || !client) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios, incluyendo el perfil de cliente.' }, {status:400});
    }

    const userFound = await db.user.findUnique({
      where: { email: email },
    });

    if (userFound) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await saltAndHashPassword(password)

    const newUser = await db.user.create({
      data: {
        email: email,
        password: hashedPassword, 
        role: 'CLIENT', 
        first_name: first_name,
        last_name: last_name,
        client:{
          create:{
            address: client.address,
            phone: client.phone,
            coverage: client.coverage
          }
        } 
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
