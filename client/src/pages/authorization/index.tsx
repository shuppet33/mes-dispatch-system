import {reatomComponent} from "@reatom/npm-react";
import clsx from "clsx";
import styles from './styles.module.css'
import {getTokenAuthAsync} from "./model.ts";


export const AuthorizationPage = reatomComponent(({ctx}) => {

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await getTokenAuthAsync(ctx, 'admin', 'admin')
        } catch (e) {
            console.log('LOOOG error', e)
        }
    }

    return (
        <div className={styles.page}>
            <form className={styles.form}>
                <h1 className={styles.title}>Авторизация</h1>

                <div className={styles.field}>
                    <label className={styles.label}>Логин</label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Введите логин"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Пароль</label>
                    <input
                        type="password"
                        className={styles.input}
                        placeholder="Введите пароль"
                    />
                </div>

                <button
                    type="submit"
                    className={clsx(styles.button)}
                    onClick={handleSubmit}
                >
                    Войти
                </button>
            </form>
        </div>
    )
}, 'AuthorizationPage')
