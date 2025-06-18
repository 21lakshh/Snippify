import { Hono } from "hono";
import { authmiddleware } from "../middlewares/middleware";
import { z } from "zod";
import prisma from '../client/client'

export const snippetRoute = new Hono<{
    Variables: { userId: string }
}>()
const CreateSnippetSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    code: z.string().min(1),
    isPrivate: z.boolean().optional(),
    tags: z.array(z.object({ name: z.string() })).optional()
})

snippetRoute.post('/create', authmiddleware, async (c) => {
    const userId = c.get('userId')

    const body = await c.req.json()
    const parsedinputs = CreateSnippetSchema.safeParse(body)
    console.log(body)
    if (!parsedinputs.success) {
        return c.json({ msg: "Invalid inputs please check again" }, 404)
    }
    try {
        const { title, description, code, isPrivate, tags } = parsedinputs.data

        // First create or find the tags
        let tagIds: string[] = []
        if (tags && tags.length > 0) {
            for (const tag of tags) {
                const existingTag = await prisma.tag.upsert({
                    where: { name: tag.name },
                    update: {},
                    create: { name: tag.name }
                })
                tagIds.push(existingTag.id)
            }
        }

        // Create the snippet
        const snippet = await prisma.snippet.create({
            data: {
                title,
                description,
                code,
                authorId: userId,
                isPrivate: isPrivate ?? false,
            }
        })

        // Create the SnippetTag relationships
        if (tagIds.length > 0) {
            await prisma.snippetTag.createMany({
                data: tagIds.map(tagId => ({
                    snippetId: snippet.id,
                    tagId: tagId
                }))
            })
        }

        // Fetch the snippet with tags for response
        const snippetWithTags = await prisma.snippet.findUnique({
            where: { id: snippet.id },
            select: {
                id: true,
                title: true,
                code: true,
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
            snippet: snippetWithTags
        }, 200)
    } catch (err) {
        console.error("Error creating snippet:", err)
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


