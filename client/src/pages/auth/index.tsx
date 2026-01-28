import {reatomComponent} from "@reatom/npm-react";
import clsx from "clsx";
import styles from './styles.module.css'
import {getTokenAuthAsync} from "./model.ts";
import {type FormEvent, useState} from "react";
import {useNavigate, useSearch} from "@tanstack/react-router";
import {userNameAtom, userRoleAtom} from "../../shared/auth/model.ts";
import {ROLE_PATTERN} from "../../shared/api/pattern.ts";


export const AuthorizationPage = reatomComponent(({ctx}) => {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate();
    const {redirect} = useSearch({from: '/login'});

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const {user} = await getTokenAuthAsync(ctx, {login, password});
            userNameAtom(ctx, user.username)
            userRoleAtom(ctx, ROLE_PATTERN[user.role])

            await navigate({to: redirect || `/${ROLE_PATTERN[user.role]}`});
        } catch {
            console.log('не верный логин или пароль')
        }
    }

    return (
        <div className={styles.page}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Авторизация</h1>

                <div className={styles.field}>
                    <label className={styles.label}>Логин</label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Введите логин"

                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Пароль</label>
                    <input
                        type="password"
                        className={styles.input}
                        placeholder="Введите пароль"

                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className={clsx(styles.button)}
                >
                    Войти
                </button>
            </form>
        </div>
    )
}, 'AuthorizationPage')
