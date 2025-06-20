import { Hono } from "hono";
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { sign } from 'hono/jwt'
import prisma from '../client/client'
import { authmiddleware } from '../middlewares/middleware'

export const userRoute = new Hono<{
    Bindings: { JWT_SECRET: string, DATABASE_URL: string },
    Variables: { userId: string }
}>()

const SignupSchema = z.object({
    username: z.string().min(5).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(20)
})

userRoute.onError((err, c) => {
    return c.json({ msg: 'Internal Server Error' }, 500)
})

userRoute.post('/signup', async (c) => {

    const body = await c.req.json()
    const parsedinputs = SignupSchema.safeParse(body)

    if (!parsedinputs.success) {
        return c.json({ msg: "Invalid Inputs please check again" }, 404)
    }
    const { email, username, password } = parsedinputs.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            username
        },
        select: {
            email: true,
            username: true,
            id: true
        }
    })

    const jwtToken = await sign({ id: result.id }, c.env.JWT_SECRET as string)

    return c.json({
        msg: "Signup done successfully!",
        user: result,
        token: jwtToken
    })
})

const SigninSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20)
})

userRoute.post('/signin', async (c) => {

    const body = await c.req.json()
    const parsedinputs = SigninSchema.safeParse(body)

    if (!parsedinputs.success) {
        return c.json({ msg: "Invalid input format" }, 404)
    }

    const { email, password } = parsedinputs.data
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: {
                password: true,
                id: true,
                username: true,
                email: true
            }
        })

        if (!user) {
            return c.json({ msg: "User not found please use a valid mail" }, 404)
        }

        const validpassword = await bcrypt.compare(password, user.password)

        if (!validpassword) {
            return c.json({ msg: "Invalid password please check and try again" }, 404)
        }
        const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET as string)
        return c.json({
            msg: "Login Successful!",
            token: jwtToken,
            user: {
                id: user.id,
                name: user.username,
                email: user.email
            }
        }, 200)
    } catch (err) {
        return c.json({ msg: "Error in Signin please check username and password" }, 500)
    }
})

userRoute.get('/me', authmiddleware, async (c) => {
    const userId = c.get('userId')
    try{
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            username: true,
            email: true
        }
    })

    return c.json({
            msg: "User's details fetched successfully!",
            user: user
        }, 200)
    } catch (err) {
        return c.json({ msg: "Error in fetching user details" }, 500)
    }
})