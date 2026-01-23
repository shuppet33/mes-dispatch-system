import Fastify from 'fastify'
import {authRoute} from "./routes/auth.js";
import {db} from './config/db.js';
import cors from '@fastify/cors';
import cookie from "@fastify/cookie";
import {requests} from "./routes/requests.js";
import {userRouters} from "./routes/user.js";


const app = Fastify({
    logger: true
})

app.decorate('db', db);
app.register(cookie, {
    secret: "my-secret",
    parseOptions: {}
})

await app.register(cors, {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
})
app.register(authRoute, {prefix: '/api/v1'})
app.register(requests, {prefix: '/api/v1'})
app.register(userRouters, {prefix: '/api/v1'})


app.listen({port: 3000}, (err) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
})