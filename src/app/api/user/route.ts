import { type NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET (req: NextRequest) {
  try {

    const usersFound = await db.user.findMany({
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

    // console.log(usersFound)

    if (!usersFound) {
      return NextResponse.json({ message: 'User not found' , status: 400 });
    }
   

    return NextResponse.json({ message: 'User found successfully', user: usersFound , status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: 'Error getting user',
      error: error.message,
     status: 500 });
  }
}
