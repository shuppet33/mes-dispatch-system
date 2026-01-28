import jwt from 'jsonwebtoken';
import {db} from "../config/db.js";
import {randomBytes} from 'node:crypto';
import bcrypt from "bcryptjs";


export const authRoute = (ctx) => {

    ctx.post('/login', async (req, res) => {

        const {login, password} = req.body
        if (!login || !password) return res.code(400).send('Bad Request')

        // запрос в БД на наличие юзера с таким логином
        const userResult = await db.query('SELECT id_user, full_name, login, password_hash, role_id, is_active FROM app_user WHERE login=$1 AND is_active=true', [login])
        if (userResult.rows.length === 0) {
            throw new Error('Пользователь не найден или отключён')
        }

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

        res.setCookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
            expires: expiresAt,
        })

        return {
            accessToken,
            user: {
                id: user.id_user,
                role: user.role_id,
                username: user.full_name
            }
        }

    })

    ctx.post('/refresh', async (req, res) => {

        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) return res.code(401).send('No refresh token')

        const result = await db.query('SELECT user_id, expires_at FROM refresh_token WHERE token = $1', [refreshToken])
        const record = result.rows[0]

        if (!record && new Date(record.expires_at) < new Date()) {
            await db.query('DELETE FROM refresh_token WHERE token=$1', [refreshToken])
            return res.code(401).send('Invalid refresh token')
        }

        const userResult = await db.query('SELECT id_user, full_name, role_id FROM app_user WHERE id_user=$1', [record.user_id])
        const user = userResult.rows[0]

        const newAccessToken = jwt.sign(
            {
                sub: user.id_user,
                role: user.role_id
            },
            process.env.JWT_ACCESS_SECRET,
            {expiresIn: '15m'}
        )

        return {accessToken: newAccessToken}
    })

    ctx.post('/logout', async (req, res) => {
        const refreshToken = req.cookies.refreshToken

        await db.query('UPDATE refresh_token SET is_revoked = true WHERE token = $1 AND is_revoked = false', [refreshToken])

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
        });
})

export const authMiddleware = async (req, res) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new Error('No Authorization header')
    }

    const [type, token] = authHeader.split(' ')

    if (type !== 'Bearer' || !token) {
        throw new Error('Invalid Authorization format')
    }

    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

    req.user = {
        id: payload.sub,
        role: payload.role
    }
}

