import {z} from "zod"

export const authSchema = z.object({
    username: z.string().min(3,{message: "Username should be atleast 3 chars"}).max(30,{message: "Username cant be longer than 30 chars"}),
    password: z.string().min(8,{message: "Password must be atleast 8 chars"})
})