import {db} from "../config/db.js";
import {authMiddleware} from "./auth.js";

export const requestRoute = (ctx) => {

    ctx.get('/requests/list',{preHandler: authMiddleware}, async (req, res) => {
        const userResult = await db.query('select * from request')
        return res.status(200).send(userResult.rows)
    })

    ctx.post('/request', async (req, res) => {
        const {
            dispatcher_id,
            service_id,
            priority_id,
            caller_full_name,
            caller_phone,
            settlement,
            address,
            description
        } = req.body;

        if (!dispatcher_id || !service_id || !priority_id || !caller_full_name || !address) {
            return res.status(400).send({message: 'Missing required fields'});
        }


        const CREATED_STATUS_ID = 1;

        try {
            const {rows} = await db.query(
                `INSERT INTO request 
                                        (dispatcher_id,
                                         service_id,
                                         status_id,
                                         priority_id,
                                         caller_full_name,
                                         caller_phone,
                                         settlement,
                                         address,
                                         description,
                                         created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, now()) RETURNING id_request`,
                [
                    dispatcher_id,
                    service_id,
                    CREATED_STATUS_ID,
                    priority_id,
                    caller_full_name,
                    caller_phone,
                    settlement,
                    address,
                    description ?? null
                ]
            );

            return res.status(201).send({
                id_request: rows[0].id_request
            });

        } catch (err) {
            console.error(err);
            return res.status(500).send({message: 'DB error'});
        }
    });


}