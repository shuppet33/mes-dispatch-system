import {reatomComponent} from "@reatom/npm-react";
import {Button, Group, PasswordInput, Select, Stack, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {ROLE_TO_ID} from "../../shared/api/pattern.ts";

import type {UserFormData, UserFormProps, UserFormValues, UserSubmitData} from './types.ts'
import type {FC} from "react";
import type {Role} from "../../shared/types/auth.ts";

const roles = [
    {value: 'dispatcher', label: 'Диспетчер'},
    {value: 'service', label: 'Служба'},
    {value: 'admin', label: 'Админ'},
];

export const AddUserForm: FC<UserFormProps> = reatomComponent(({ctx, onCancel}) => {
    const form = useForm<UserFormData>({
        initialValues: {
            role: '',
            login: '',
            password: '',
            confirmPassword: '',
            full_name: '',
        },
        validate: {
            role: (value) => (value ? null : 'Обязательно'),
            login: (value) => {
                if (!value) return 'Обязательно';
                if (value.length < 4) return 'Минимум 4 символа';
                if (!/^[a-zA-Z0-9_-]+$/.test(value)) return 'Только латиница, цифры, _ или -';
                return null;
            },
            password: (value) => {
                if (!value) return 'Обязательно';
                if (value.length < 8) return 'Минимум 8 символов';
                if (/.*[а-яА-ЯёЁ].*/.test(value)) return 'Только латиница и символы (без кириллицы)';
                return null;
            },
            confirmPassword: (value, values) =>
                value !== values.password ? 'Пароли не совпадают' : null,
            full_name: (value) => {
                if (!value) return 'Обязательно';
                const parts = value.trim().split(/\s+/);
                if (parts.length < 3) return 'Укажите Фамилию, Имя и Отчество';
                if (!/^[а-яА-ЯёЁ\s]+$/.test(value)) return 'Только кириллица и пробелы';
                return null;
            },
        },
    });

    const handleSubmit = (values: UserFormValues) => {

        const submitData: UserSubmitData = {
            role: ROLE_TO_ID[values.role as Role],
            login: values.login,
            password: values.password,
            full_name: values.full_name,
        };

        console.log('LOOOG', submitData)
    };


    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Select
                    label="Роль"
                    placeholder="Выберите роль"
                    data={roles}
                    required
                    {...form.getInputProps('role')}
                />
                <TextInput
                    label="Логин"
                    required
                    {...form.getInputProps('login')}
                />
                <TextInput
                    label="ФИО"
                    placeholder="Иванов Иван Иванович"
                    required
                    {...form.getInputProps('full_name')}
                />
                <PasswordInput
                    label="Пароль"
                    required
                    {...form.getInputProps('password')}
                />
                <PasswordInput
                    label="Повторите пароль"
                    required
                    {...form.getInputProps('confirmPassword')}
                />

                <Group justify="flex-end" mt="md">
                    <Button variant="outline" onClick={onCancel}>
                        Отмена
                    </Button>
                    <Button type="submit">Создать</Button>
                </Group>
            </Stack>
        </form>
    );
}, 'AddUserForm')