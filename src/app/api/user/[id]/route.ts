import { type NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { revalidatePath, revalidateTag } from 'next/cache';

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
      return NextResponse.json({ message: 'User not found', status: 404 });
    }
   

    return NextResponse.json({ message: 'User found successfully', user: userFound, status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: 'Error creating user',
      error: error.message,
     status: 500 });
  }
}
export async function PUT (req: NextRequest) {
  try { 

    const data = await req.json()

    

    const userUpdated = await db.user.update({        
      where: { user_id: data.user_id },
      include:{
        client: true,
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
      },
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        client: {
          update:{
            address:data.address,
            coverage:data.coverage,
            phone:data.phone
          
          }
        }
      }
      
    });



    if (!userUpdated) {
      return NextResponse.json({ message: 'User not found', status: 404 });
    }
   
    revalidateTag('user');
    revalidatePath(`/dashboard/${data.user_id}`)

    return NextResponse.json({ message: 'User updated successfully', user: userUpdated, status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: 'Error updating user',
      error: error.message,
     status: 500 });
  }
}
