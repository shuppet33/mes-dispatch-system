import {reatomComponent} from "@reatom/npm-react";
import {Layout} from "../layout";
import {Button, Modal, Tabs, Title} from "@mantine/core";
import {useState} from "react";
import {AddUserForm} from "./add-user-form.tsx";
import type {Request, Service, User} from "./types.ts";
import {UserTable} from "./users-table.tsx";
import {RequestTable} from "./requests-table.tsx";

export const mockUsers: User[] = [
    {
        id_user: 1,
        login: 'admin',
        full_name: 'Иванов Иван Иванович',
        phone: '+7 (999) 111-22-33',
        role_id: 1,
        created_at: '2025-10-15T08:30:00Z',
    },
    {
        id_user: 2,
        login: 'disp1',
        full_name: 'Петрова Анна Сергеевна',
        phone: '+7 (999) 444-55-66',
        role_id: 2,
        created_at: '2025-11-03T14:20:00Z',
    },
    {
        id_user: 3,
        login: 'serv1',
        full_name: 'Сидоров Дмитрий Владимирович',
        phone: '+7 (999) 777-88-99',
        role_id: 3,
        created_at: '2025-12-01T10:45:00Z',
    },
    {
        id_user: 4,
        login: 'disp2',
        full_name: 'Кузнецова Елена Павловна',
        phone: '+7 (999) 222-33-44',
        role_id: 2,
        created_at: '2026-01-10T09:15:00Z',
    },
    {
        id_user: 5,
        login: 'serv2',
        full_name: 'Морозов Алексей Юрьевич',
        phone: '+7 (999) 666-77-88',
        role_id: 3,
        created_at: '2026-01-20T16:00:00Z',
    },
];

export const mockRequests: Request[] = [
    {
        id_request: 101,
        dispatcher_id: 2,
        service_id: 1,
        caller_full_name: 'Иванов Иван Иванович',
        caller_phone: '+7 (999) 123-45-67',
        settlement: 'Москва',
        address: 'ул. Ленина, д. 10, кв. 5',
        status_id: 1,
        priority_id: 2,
        description: 'Не работает интернет, перезагрузка не помогает.',
        created_at: '2026-01-20T10:15:00Z',
        updated_at: '2026-01-20T10:15:00Z',
        closed_at: '',
    },
    {
        id_request: 102,
        dispatcher_id: 5,
        service_id: 2,
        caller_full_name: 'Петрова Анна Сергеевна',
        caller_phone: '+7 (999) 876-54-32',
        settlement: 'Санкт-Петербург',
        address: 'пр. Невский, д. 25',
        status_id: 2,
        priority_id: 1,
        description: 'Требуется выезд мастера: протечка трубы.',
        created_at: '2026-01-21T14:30:00Z',
        updated_at: '2026-01-22T09:00:00Z',
        closed_at: '',
    },
    {
        id_request: 103,
        dispatcher_id: 2,
        service_id: 1,
        caller_full_name: 'Сидоров Дмитрий Владимирович',
        caller_phone: '+7 (999) 111-22-33',
        settlement: 'Казань',
        address: 'ул. Баумана, д. 7',
        status_id: 3,
        priority_id: 3,
        description: 'Проблема решена по телефону.',
        created_at: '2026-01-18T16:45:00Z',
        updated_at: '2026-01-19T11:20:00Z',
        closed_at: '2026-01-19T11:20:00Z',
    },
    {
        id_request: 104,
        dispatcher_id: 2,
        service_id: 1,
        caller_full_name: 'Кузнецова Елена Павловна',
        caller_phone: '+7 (999) 444-55-66',
        settlement: 'Екатеринбург',
        address: 'ул. Мира, д. 30',
        status_id: 1,
        priority_id: 2,
        description: 'Заявка отменена клиентом.',
        created_at: '2026-01-23T08:10:00Z',
        updated_at: '2026-01-23T08:15:00Z',
        closed_at: '2026-01-23T08:15:00Z',
    },
];

export const mockServices: Service[] = [
    {id: 1, name: 'Скорая', description: 'Скорая помощь типо'},
    {id: 2, name: 'Полиция', description: 'Полиция помощь типо'},
]

export const AdminPages = reatomComponent((ctx) => {
    const [opened, setOpened] = useState(false);

    return (
        <Layout>
            <Title order={2}>АДМИН</Title>

            <Tabs defaultValue="users" mt="md">
                <Tabs.List>
                    <Tabs.Tab value="users">Пользователи</Tabs.Tab>
                    <Tabs.Tab value="requests">Заявки</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="users" pt="xs">
                    <Button onClick={() => setOpened(true)}>Создать Юзер</Button>
                    <div style={{marginTop: '16px'}}>
                        <UserTable users={mockUsers} onDelete={(id) => console.log('Удаляем пользователя:', id)}/>
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value="requests" pt="xs">
                    {/* Заглушка для "Заявок" */}
                    <div>
                        <RequestTable
                            services={mockServices}
                            requests={mockRequests}
                            onDelete={(id: number) => console.log('LOOOG удалена запись в таблице', id)}
                        />
                    </div>
                </Tabs.Panel>
            </Tabs>

            <Modal opened={opened} onClose={() => setOpened(false)} title="Создать пользователя">
                <AddUserForm onCancel={() => setOpened(false)}/>
            </Modal>
        </Layout>
    )
}, 'AdminPages');

