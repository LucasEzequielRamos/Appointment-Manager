import { auth } from '@/auth'

export async function getUserById (id: number): Promise<any> {
  try {
    const userData = await auth()
    

    if (userData !== undefined) {
      const res = await fetch(`${process.env.NEXTAUTH_URL}api/users/${id}`, {
        method: 'GET'
      })

      const {user} = await res.json()
      return user
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
  }
}


export async function getAllUsers (): Promise<any> {
  try {
    const userData = await auth()
    

    if (userData !== undefined) {
      const res = await fetch(`${process.env.NEXTAUTH_URL}api/users`, {
        method: 'GET'
      })

      const {user: usersList} = await res.json()
      return usersList
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
  }
}