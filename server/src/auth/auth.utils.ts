import {z} from 'zod'
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;


export const authInputSchema = z.object({
    username: z.string().max(15), 
    password: z.string().refine(password => passwordRegex.test(password), {
        message: "not a strong password"
    })
})