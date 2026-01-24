import {db} from "../config/db.js";

export const requests = (ctx) => {
    ctx.post('/requests/list', async (req, res) => {
        const userResult = await db.query('select * from request')
        return res.status(200).send(userResult.rows[0])
    })

}