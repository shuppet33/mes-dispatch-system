import clsx from 'clsx'
import styles from './admin-dashboard.module.css'

const operators = [
    {
        id: 101,
        online: true,
        disabled: false,
        stats24h: {
            total: 32,
            closed: 28,
            active: 4,
        },
    },
    {
        id: 102,
        online: false,
        disabled: true,
        stats24h: {
            total: 14,
            closed: 10,
            active: 4,
        },
    },
];

export const AdminDashboard = () => {
    return (
        <div className={styles.adminPage}>
            {/* Header */}
            <header className={styles.adminHeader}>
                <h1 className={styles.title}>Админ-панель МЧС</h1>

                <div className={styles.adminActions}>
                    <button className={styles.primary}>Создать пользователя</button>
                    <button className={styles.primary}>Добавить службу</button>
                    <button className={styles.secondary}>ЛК администратора</button>
                </div>
            </header>

            {/* Operators */}
            <section className={styles.operatorsSection}>
                <div className={clsx(styles.row, styles.headerRow)}>
                    <div className={styles.colStatus}>Статус</div>
                    <div className={styles.colId}>ID оператора</div>
                    <div className={styles.colStats}>Заявки за 24ч</div>
                    <div className={styles.colActions}>Действия</div>
                </div>

                {operators.map((op) => (
                    <div
                        key={op.id}
                        className={clsx(styles.row, {
                            [styles.disabled]: op.disabled,
                        })}
                    >
                        <div className={styles.cellStatus}>
                            <span
                                className={clsx(styles.statusDot, {
                                    [styles.online]: op.online,
                                    [styles.offline]: !op.online,
                                })}
                            />
                        </div>

                        <div className={styles.cell}>
                            #{op.id}
                        </div>

                        <div className={styles.cellMuted}>
                            #00278AA
                        </div>

                        <div className={styles.cellStrong}>
                            {op.stats24h.total}
                        </div>

                        <button className={styles.iconButton}>
                            🗑
                        </button>

                        {/* Info */}
                        <button className={styles.iconButton}>
                            ❗
                        </button>
                    </div>
                ))}
            </section>
        </div>
    );
}