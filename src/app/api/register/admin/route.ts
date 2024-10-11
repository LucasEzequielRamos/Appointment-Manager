import { type NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { saltAndHashPassword } from "@/utils/password"
import { auth } from '@/auth'
import HTTPError from '@/utils/HTTPError';

export async function POST(req: Request) {
  try {
    const session = await auth();
    console.log({ session });

    if (!session) {
      throw new HTTPError('Session does not exist', 401);
    }

    if (session.user.role !== 'ADMIN') {
      throw new HTTPError('Unauthorized, you don’t have permission', 401);
    }

    const { first_name, last_name, email, password, confirmPassword } = await req.json();

    console.log({ email });
    if (!email) {
      throw new HTTPError('El email es obligatorio.', 400);
    }

    const userFound = await db.user.findUnique({
      where: { email },
    });

    if (userFound) {
      throw new HTTPError('Usuario ya existente', 400);
    }

    if (password !== confirmPassword) {
      throw new HTTPError('Las contraseñas no coinciden', 400);
    }

    if (!first_name || !last_name || !password || !confirmPassword) {
      throw new HTTPError('Todos los campos son obligatorios', 400);
    }

    const hashedPassword = await saltAndHashPassword(password);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'ADMIN',
        first_name,
        last_name,
      },
    });

    return NextResponse.json(
      {
        message: 'Admin user created successfully',
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);

    if (error instanceof HTTPError) {
      console.log(error)
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: error.status }
      );
    }

    return NextResponse.json({ message: 'Error creating user', error: error.message }, { status: 500 });
  }
}

