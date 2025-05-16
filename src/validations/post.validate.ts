import {z} from 'zod'

export const postSchema = z.object({
    headline: z.string().min(10, "Headline must be atleast 10 letter.").max(150, "Headline must be atmost 150 letter."),
    image: z.string(),
    description: z.string().min(10, "Description must be atleast 10 letter.").optional(),
    articleBody: z.string().min(50, "Article Body should be at least 50 letters.")
}).strict()

export const updatePostSchema = z.object({
    headline: z.string().min(10, "Headline must be atleast 10 letter.").max(150, "Headline must be atmost 150 letter.").optional(),
    image: z.string().optional(),
    description: z.string().min(10, "Description must be atleast 10 letter.").optional(),
    articleBody: z.string().min(50, "Article Body should be at least 50 letters.").optional()
})