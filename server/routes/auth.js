import jwt from 'jsonwebtoken';
import {db} from "../config/db.js";
import { randomBytes } from 'node:crypto';
import bcrypt from "bcryptjs";


export const authRoute = (ctx) => {

    ctx.post('/login', async (req, res) => {
        const {login, password} = req.body
        if (!login || !password) return res.code(400).send('Bad Request')

        // запрос в БД на наличие юзера с таким логином
        const userResult = await db.query('SELECT id_user, full_name, login, password_hash, role_id, is_active FROM app_user WHERE login=$1', [login])

        const user = userResult.rows[0]

        if (!user) return res.code(401).send('Invalid login or password')
        if (!user.is_active) return res.code(401).send('Account is blocked or inactive')

        // валиден ли пароль
        const isPasswordValid = await bcrypt.compare(password, user.password_hash)
        if (!isPasswordValid) return res.code(401).send('Invalid login or password')

        // генерируем акцесс и рефреш токены
        const accessToken = jwt.sign({
            sub: user.id_user,
            role: user.role_id
        }, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})

        const refreshToken = randomBytes(40).toString('hex');

        // генерируем срок годности refresh
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7)

        // сохраняем рефреш токен в базу
        await db.query('INSERT INTO refresh_token(user_id, token, expires_at) VALUES($1, $2, $3)', [user.id_user, refreshToken, expiresAt])

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id_user,
                role: user.role_id,
                username: user.full_name
            }
        }

    })

}