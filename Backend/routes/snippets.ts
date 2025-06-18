import { Hono } from "hono";
import { authmiddleware } from "../middlewares/middleware";
import { z } from "zod";
import prisma from "../client/client";

export const snippetRoute = new Hono<{
    Variables: { userId: string }
}>()
const CreateSnippetSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    code: z.string().min(1),
    language: z.string().min(1),
    isPrivate: z.boolean().optional(),
    tags: z.array(z.string()).optional()
})

snippetRoute.post('/create', authmiddleware, async (c) => {
    const userId = c.get('userId')

    const body = await c.req.json()
    const parsedinputs = CreateSnippetSchema.safeParse(body)

    if (!parsedinputs.success) {
        return c.json({ msg: "Invalid inputs please check again" }, 404)
    }
    try {
        const { title, description, code, language, isPrivate, tags } = parsedinputs.data

        let tagWrites: any[] = []
        if(tags){
        tagWrites = tags.map((name) => ({
            tag: { 
              connectOrCreate: {
                where:  { name },     // look‑up key (Tag.name is UNIQUE)
                create: { name }      // how to create the tag if it doesn’t exist
              }
            }
          }))
        }
        const snippet = await prisma.snippet.create({
            data: {
                title,
                description,
                code,
                language,
                authorId: userId,
                isPrivate,
                tags: {
                    connectOrCreate: tagWrites
                }
            },
            select: {
                id: true,
                title: true,
                code: true,
                language: true,
                isPrivate: true,
                tags: {
                    select: {
                        tag: {
                            select: { name: true }
                            // const names = snippet.tags.map((t) => t.tag.name)
                        }
                    }
                }
            }
        })
        return c.json({
            msg: "Snippet created successfully!",
            snippet: snippet
        }, 200)
    } catch (err) {
        return c.json({ msg: "Error in creating snippet" }, 500)
    }
})

snippetRoute.get("/all", async (c) => {

    try{
    const snippets = await prisma.snippet.findMany({
        where: {
            isPrivate: false
        },
        select: {
            id: true,
            title: true,
            description: true,
            code: true,
            language: true
        }
    })

    return c.json({
        msg: "All snippets fetched successfully!",
            snippets: snippets
        }, 200)
    } catch (err) {
        return c.json({ msg: "Error in fetching snippets" }, 500)
    }
})


