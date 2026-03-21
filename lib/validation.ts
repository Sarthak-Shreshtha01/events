import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(3, {message: "Title is required"}).max(100, {message: "Title must be less than 100 characters"}),
    description: z.string().min(20, {message: "Description is required"}).max(500, {message: "Description must be less than 500 characters"}),
    category: z.string().min(3, {message: "Category is required"}).max(520, {message: "Category must be less than 50 characters"}),

    link: z.string().url().refine(async (url) => {
        try{
            const res = await fetch(url , {method: "GET"})
            const contentType = res.headers.get("content-type")
            if(contentType?.startsWith('image/')){
                return true
            }
            else {
                return false
            }
        }
        catch{
            return false
        }
    } ),
    pitch: z.string().min(10, {message: "Pitch is required"}),

})
