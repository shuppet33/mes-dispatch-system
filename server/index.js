import Fastify from 'fastify'
import {authRoute} from "./routes/auth.js";
import {db} from './config/db.js';
import cors from '@fastify/cors';
import cookie from "@fastify/cookie";
import {requests} from "./routes/requests.js";
import {userRouters} from "./routes/user.js";
import {dispatcherAuth} from "./routes/dispatcher.js";
import {serviceAuth} from "./routes/service.js";


const app = Fastify({
    logger: true
})

app.decorate('db', db);
app.register(cookie, {
    secret: "my-secret",
    parseOptions: {}
})

await app.register(cors, {
    origin: ['http://localhost:5173', 'http://localhost:3001'],
    credentials: true
})

const prefix = {prefix: '/api/v1'}

app.register(authRoute, prefix)
app.register(requests, prefix)
app.register(userRouters, prefix)
app.register(dispatcherAuth, prefix)
app.register(serviceAuth, prefix)


app.listen({port: 3000}, (err) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
})