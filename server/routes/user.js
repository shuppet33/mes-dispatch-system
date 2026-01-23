import {db} from "../config/db.js";
import bcrypt from "bcryptjs";

export const userRouters = (ctx) => {

    ctx.post('/user', async (req, res) => {
        const {login, password, role, full_name} = req.body

        if (!login) {
            return res.status(400).send('please add login')
        }
        if (!password) {
            return res.status(400).send('please add password')
        }
        if (!role) {
            return res.status(400).send('please add role')
        }
        if (!full_name) {
            return res.status(400).send('please add full_name')
        }

        try {
            const passwordHash = await bcrypt.hash(password, 12);

            await db.query(
                `INSERT INTO app_user (login, password_hash, role_id, full_name)
                 VALUES ($1, $2, $3, $4)`,
                [login, passwordHash, role, full_name]
            );

            return res.status(201).send('user added');
        } catch (err) {
            console.error(err);
            return res.status(500).send('error');
        }
    })



    ctx.get('/users/list', async (req, reply) => {
        const { rows } = await db.query(
            `SELECT * FROM app_user WHERE is_active = true`
        );

        return reply.code(200).send(rows);
    });

    ctx.delete('/user/:id', async (req, reply) => {
        const { id } = req.params;

        const result = await db.query(
            `UPDATE app_user SET is_active = false WHERE id_user = $1 RETURNING id_user, login, role_id, is_active`, [id]
        );

        if (result.rowCount === 0) {
            return reply.code(404).send({ message: 'User not found' });
        }

        return reply.code(200).send(result.rows[0]);
    });

}
