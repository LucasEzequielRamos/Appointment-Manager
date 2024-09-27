import bcrypt from 'bcrypt'


export async function saltAndHashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
     return hashedPassword
}
export async function comparePassword(password: string, passwordToCompare: string): Promise<boolean>{
   return await bcrypt.compare(password, passwordToCompare);
     
}