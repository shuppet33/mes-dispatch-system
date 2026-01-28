import {db} from "../config/db.js";
import {authMiddleware} from "./auth.js";


export const serviceRoute = (ctx) => {

    ctx.get('/services',{preHandler: authMiddleware}, async (req, res) => {
        const {rows} = await db.query(
            `
                SELECT id_service,
                       name,
                       description
                FROM service
                WHERE is_active = true
                ORDER BY id_service
            `
        );
        return rows;
    });
}
