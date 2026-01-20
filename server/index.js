import Fastify from 'fastify'
import {authRoute} from "./routes/auth.js";
import {db} from './config/db.js';

const app = Fastify({
    logger: true
})

app.decorate('db', db);

app.register(authRoute, {prefix: '/api/v1'})

app.listen({port: 3000}, (err) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
})