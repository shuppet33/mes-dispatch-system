export const ROLE_PATTERN = {
    1: 'admin',
    2: 'dispatcher',
    3: 'service'
} as const;

export const ROLE_RUS = {
    ['admin']: 'Админ',
    ['dispatcher']: 'Диспетчер',
    ['service']: 'Служба',
}

export const ROLE_TO_ID = {
    ['admin']: 1,
    ['dispatcher']: 2,
    ['service']: 3
} as const;

export const STATUS_PATTERN = {
    1: 'Новая',
    2: 'В работе',
    3: 'Закрыта',
    4: 'Отменена',
} as const;

export const STATUS_TO_ID = {
    ['Новая']: 1,
    ['В работе']: 2,
    ['Закрыта']: 3,
    ['Отменена']: 4,
} as const;

export const PRIORITY_PATTERN = {
    1: 'Низкий',
    2: 'Средний',
    3: 'Высокий',
    4: 'Чрезвычайный',
} as const;

