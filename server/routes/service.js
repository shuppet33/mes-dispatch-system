import {db} from "../config/db.js";


export const serviceAuth = (ctx) => {

    ctx.get('/services', async (req, res) => {
        const { rows } = await db.query(
            `
    SELECT
      id_service,
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
