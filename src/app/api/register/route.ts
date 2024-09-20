import { type NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST (req: NextRequest) {
  try {
    const data = await req.json()

    const userFound = await db.user.findUnique({
      where: {
        email: data.email
      }
    })

    if (!userFound) {
      return NextResponse.json({ message: 'The user already exists' }, { status: 404 })
    }

    const clientFound = await db.clientProfile.findUnique({
      where: {
        client_id: userFound.user_id
      }
    })

    if(!clientFound) return 
    console.log(clientFound)
    const userUpdate = await db.user.update({
      where:{
        user_id: clientFound.client_id
      },
      data:{
        client:{
          update: clientFound
        }
       
      }
    })

    // const newUser = await db.user.create({
    //   data: {
    //     ...data,
    //   }
    // })

    // const newClientProfile = await db.clientProfile.create({
    //   data:{
    //     address: data.address,
    //     client_id: userFound.user_id
    //   }
    // })

    return NextResponse.json({  Client: userUpdate }, { status: 200 })
  } catch (error: any ) {
    console.log(error)
    return NextResponse.json({
      message: error.message
    }, { status: 500 })
  }
}
