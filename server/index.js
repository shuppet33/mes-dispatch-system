import Fastify from 'fastify'
import {authRoute} from "./routes/auth.js";
import {db} from './config/db.js';
import cors from '@fastify/cors';
import cookie from "@fastify/cookie";
import {requestRouter} from "./routes/requests.js";
import {userRouters} from "./routes/user.js";


const app = Fastify({
    logger: true
})

app.decorate('db', db);
app.register(cookie, {
    secret: "my-secret",
    parseOptions: {}
})

app.register(cors, {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']
})

const prefix = {prefix: '/api/v1'}

await app.register(authRoute, prefix)
await app.register(requestRouter, prefix)
await app.register(userRouters, prefix)


app.listen({port: 3000}, (err) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
})