import { auth } from "@/auth";
import config from "./config";
import { revalidateTag } from "next/cache";

export async function getUserById(id: number): Promise<any> {
  try {
    const userData = await auth();
    console.log(userData)

    if (userData !== undefined) {
      const res = await fetch(`${config.NEXT_API_URL}/user/${id}`, {
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
    const res = await fetch(`${config.NEXT_API_URL}/user`, {
      method: "GET",
    });

    const { user: usersList } = await res.json();
    return usersList;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUserById(id: number): Promise<any> {
  try {
      const res = await fetch(`${config.NEXT_API_URL}/user/${id}`, {
        method: "DELETE",
        body: JSON.stringify(id)
      });

      revalidateTag('user')

      const message = await res.json();
      return message;
  } catch (error) {
    console.log(error);
  }
}
