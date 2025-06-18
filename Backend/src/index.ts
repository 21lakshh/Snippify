import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRoute } from '../routes/user'
import { snippetRoute } from '../routes/snippets'
const app = new Hono()

app.use('*', cors())
app.route('/api/v1/user', userRoute)
app.route('/api/v1/snippet', snippetRoute)

export default app
