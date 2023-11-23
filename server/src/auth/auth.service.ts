import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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

export function createAccessToken(payload: string){
    return jwt.sign({userId: payload}, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: '10m'
    })
}
export function createRefreshToken(payload: string){
    return jwt.sign({userId: payload}, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: '15d'
    })
}