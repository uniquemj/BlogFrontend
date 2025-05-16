import {z} from 'zod'


export const registerUserSchema = z.object({
    fullname: z.string().min(7, "Fullname must contain at least 7 letters").max(50, "Fullname must contain at most 50 letters."),
    email: z.string().email(),
    password: z.string().min(8, "Password must contain 8 letters")
}).strict()

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must contain 8 letters")
}).strict()
