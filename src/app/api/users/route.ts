import { type NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET (req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    
    if(!email) return 

    const userFound = await db.user.findUnique({
      where: { email: email},
      include: {
        client:true,
        professional:{
          include:{
            availability:{
              include:{
                time_slot: true
              }
            }
          }
        }
      }
    });

    console.log(userFound)

    if (!userFound) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 });
    }
   

    return NextResponse.json({ message: 'User found successfully', user: userFound }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: 'Error creating user',
      error: error.message,
    }, { status: 500 });
  }
}
