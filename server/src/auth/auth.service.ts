import bcrypt from 'bcrypt'
const salt_rounds = 10
export async function hashPassword(password: string){
    try {
        const hashed_password = await bcrypt.hash(password, salt_rounds) 
        return hashed_password
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function isCorrectPassword(plain_password: string, hashed_password: string) {
    try {
        const result = await bcrypt.compare(plain_password, hashed_password)
        return result
    } catch (error: any) {
        throw new Error(error)
    }
}