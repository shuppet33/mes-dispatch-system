import {db} from "../config/db.js";


export const dispatcherAuth = (ctx) => {

    ctx.post('/requests', async (req, res) => {
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

        const CREATED_STATUS_ID = 1;

        if (!dispatcher_id || !service_id || !priority_id || !caller_full_name || !address) {
            return res.code(400).send({ message: 'Missing required fields' });
        }

        const client = await db.connect();

        try {
            await client.query('BEGIN');

            const result = await client.query(
                `
      INSERT INTO request (
        dispatcher_id,
        service_id,
        caller_full_name,
        caller_phone,
        settlement,
        address,
        status_id,
        priority_id,
        description,
        created_at
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9, now()
      )
      RETURNING id_request
      `,
                [
                    dispatcher_id,
                    service_id,
                    caller_full_name,
                    caller_phone ?? null,
                    settlement ?? null,
                    address,
                    CREATED_STATUS_ID,
                    priority_id,
                    description ?? null
                ]
            );

            const requestId = result.rows[0].id_request;

            await client.query(
                `
      INSERT INTO request_history (
        request_id,
        changed_by,
        old_status,
        new_status,
        comment
      )
      VALUES ($1, $2, NULL, $3, 'Создание заявки')
      `,
                [requestId, dispatcher_id, CREATED_STATUS_ID]
            );

            await client.query('COMMIT');

            return res.code(201).send({ id_request: requestId });

        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    });



}
