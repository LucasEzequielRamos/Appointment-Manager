import { auth } from "@/auth";
const apiUrl = process.env.NEXT_API_URL || 'http://localhost:3000/api';

export async function getUserById(id: number): Promise<any> {
  try {
    const userData = await auth();

    if (userData !== undefined) {
      const res = await fetch(`${apiUrl}/user/${id}`, {
        method: "GET",
      });

      const { user } = await res.json();
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUsers(): Promise<any> {
  try {
    const res = await fetch(`${apiUrl}/user`, {
      method: "GET",
    });

    const { user: usersList } = await res.json();
    return usersList;
  } catch (error) {
    console.log(error);
  }
}
