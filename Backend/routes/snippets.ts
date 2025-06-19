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

const UpdateSnippetSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    code: z.string().min(1).optional(),
    isPrivate: z.boolean().optional(),
    tags: z.array(z.object({ name: z.string() })).optional(),
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
                },
                author: {
                    select: {
                        username: true,
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
            author: {
                select: {
                    username: true,
                }
            },
            tags: {
                select: {
                    tag: {
                        select: { name: true }
                    }
                }
            }
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


snippetRoute.get("/private", authmiddleware, async (c) => {

    try{
    const userId = c.get('userId')
    const userSnippets = await prisma.snippet.findMany({
        where: { authorId: userId, isPrivate: true },
        select: {
            id: true,
            title: true,
            description: true,
            code: true,
            author: {
                select: {
                    username: true,
                }
            },
            tags: {
                select: {
                    tag: {
                        select: { name: true }
                    }
                }
            }
        }
    })
    const publicSnippets = await prisma.snippet.findMany({
        where: { authorId: userId, isPrivate: false },
        select: {
            id: true,
            title: true,
            description: true,
            code: true,
            author: {
                select: {
                    username: true,
                }
            },
            tags: {
                select: {
                    tag: {
                        select: { name: true }
                    }
                }
            }
        }
    })

    const allSnippets = [...userSnippets, ...publicSnippets]
    return c.json({
        msg: "Snippets fetched successfully!",
        snippets: allSnippets
    }, 200)
    } catch (err) {
        return c.json({ msg: "Error in fetching snippets" }, 500)
    }
})

// Delete snippet

snippetRoute.delete("/delete/:id", authmiddleware, async (c) => {
    const userId = c.get('userId')
    const snippetId = c.req.param('id')
    const snippet = await prisma.snippet.findUnique({
        where: { id: snippetId },
        select: {
            authorId: true
        }
    })
    if (!snippet) {
        return c.json({ msg: "Snippet not found" }, 404)
    }
    if (snippet.authorId !== userId) {
        return c.json({ msg: "You are not authorized to delete this snippet" }, 403)
    }
    await prisma.snippet.delete({
        where: { id: snippetId }
    })
    return c.json({
        msg: "Snippet deleted successfully!",
        snippet: snippet
    }, 200)
})

// update snippet 

snippetRoute.put("/update/:id", authmiddleware, async (c) => {
    const userId = c.get('userId')
    const snippetId = c.req.param('id')
    const body = await c.req.json()
    const parsedinputs = UpdateSnippetSchema.safeParse(body)
    if (!parsedinputs.success) {
        return c.json({ msg: "Invalid inputs please check again" }, 404)
    }

    try {
        const { title, description, code, isPrivate, tags } = parsedinputs.data
        
        // Handle tags if provided
        let tagIds: string[] = []
        if (tags && tags.length > 0) {
            // First create or find the tags
            for (const tag of tags) {
                const existingTag = await prisma.tag.upsert({
                    where: { name: tag.name },
                    update: {},
                    create: { name: tag.name }
                })
                tagIds.push(existingTag.id)
            }
        }

        // Update the snippet
        const snippet = await prisma.snippet.update({
            where: { id: snippetId },
            data: {
                title,
                description,
                code,
                isPrivate
            },
            select: {
                id: true,
                title: true,
                description: true,
                code: true,
                isPrivate: true,
            }
        })

        // Update tags if provided
        if (tags !== undefined) {
            // Delete existing SnippetTag relationships
            await prisma.snippetTag.deleteMany({
                where: { snippetId: snippetId }
            })

            // Create new SnippetTag relationships
            if (tagIds.length > 0) {
                await prisma.snippetTag.createMany({
                    data: tagIds.map(tagId => ({
                        snippetId: snippetId,
                        tagId: tagId
                    }))
                })
            }
        }

        // Fetch the updated snippet with tags for response
        const snippetWithTags = await prisma.snippet.findUnique({
            where: { id: snippetId },
            select: {
                id: true,
                title: true,
                description: true,
                code: true,
                isPrivate: true,
                tags: {
                    select: {
                        tag: {
                            select: { name: true }
                        }
                    }
                },
                author: {
                    select: {
                        username: true,
                    }
                }
            }
        })

        return c.json({
            msg: "Snippet updated successfully!",
            snippet: snippetWithTags
        }, 200)
    } catch (err) {
        console.error("Error updating snippet:", err)
        return c.json({ msg: "Error in updating snippet" }, 500)
    }
})


