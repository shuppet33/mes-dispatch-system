import Fastify from 'fastify'
import { authRoute, authMiddleware } from './routes/auth.js'
import { db } from './config/db.js'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'
import { requestRoute } from './routes/requests.js'
import { userRoute } from './routes/user.js'
import { serviceRoute } from './routes/service.js'

const app = Fastify({ logger: false })

app.decorate('db', db)

await app.register(cookie, {
    secret: 'my-secret'
})

await app.register(cors, {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
})


app.register(authRoute, {
    prefix: '/api/v1'
})

app.register(requestRoute, {
    prefix: '/api/v1',
    preHandler: authMiddleware
})

app.register(userRoute, {
    prefix: '/api/v1',
    preHandler: authMiddleware
})

app.register(serviceRoute, {
    prefix: '/api/v1'
})


app.listen({ port: 3000 }, err => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
})
