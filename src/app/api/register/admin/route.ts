import { type NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { saltAndHashPassword } from "@/utils/password"
import { auth } from '@/auth'


export async function POST (req: NextRequest) {
  try {
    const session = await auth()
    console.log(session)
    if (!session) {
        return NextResponse.json({ message: 'Session not exist', status: 401 });
    }
    
    if ( session.user.role !== 'ADMIN'){return NextResponse.json({ message: 'Unauthorized, you don´t have permission', status: 401 });}

    const { first_name, last_name, email, password, confirmPassword } = await req.json()

    console.log(email)
    if(!email) {return NextResponse.json({ error: 'El mail es obligatorio.' ,  status: 400 })};

    if(email.split('@')[1] !== 'admin.com') {return NextResponse.json({ error: 'El mail no es permitido, debe finalizar en @admin.com.' ,  status: 400 });}
    
    const userFound = await db.user.findUnique({
        where: { email: email },
    });

    if (userFound) {
        return NextResponse.json({ message: 'User already exists', status: 400 });
    }

    if (password !== confirmPassword) {
        return NextResponse.json({ message: 'Las contraseñas no coinciden', status: 400 });
    }

    if (!first_name || !last_name || !password || !confirmPassword) {
        return NextResponse.json({ message: 'Todos los campos son obligatorios', status: 400 });
    }

    const hashedPassword = await saltAndHashPassword(password)

    const newUser = await db.user.create({
        data: {
        email: email,
        password: hashedPassword, 
        role: 'ADMIN', 
        first_name: first_name,
        last_name: last_name,
        },
    });


    return NextResponse.json({ message: 'Admin user created successfully', user: newUser , status: 201 });

        
    }
   catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: 'Error creating user',
      error: error.message,
    }, { status: 500 });
  }
}
