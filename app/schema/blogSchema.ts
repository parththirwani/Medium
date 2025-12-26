import { z } from "zod"

export const blogSchema = z.object({
    title: z.string().min(3, { message: "Title should be atleast 3 chars" }).max(30, { message: "Title cant be longer than 30 chars" }),
    description: z.string().min(3, { message: "Description should be atleast 3 chars" }).max(300, { message: "Description cant be longer than 300 chars" }),
    content: z.string().min(3, { message: "Content should be atleast 3 chars" }).max(1000, { message: "Content cant be longer than 1000 chars" }).optional(),
    visibility: z.enum(["PRIVATE", "PUBLIC"]).default("PRIVATE"),
    tags: z.array(z.string()),
    status: z.enum(["DRAFT", "POSTED"]).default("DRAFT"),
    minRead: z.int().optional()
})
