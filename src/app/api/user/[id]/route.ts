import { type NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET (req: NextRequest, {params}: {params:{id: number}}) {
  try {
    const user_id = params.id
    
    if(!user_id) return 

    const userFound = await db.user.findUnique({        
      where: { user_id: Number(user_id)},
      include: {
        client:true,
        professional:{
          include:{
            services:{
              include:{
                availability:{
                  include:{
                    time_slot: true
                  }
                }
              }
            }
          }
        }
      }
    });



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
