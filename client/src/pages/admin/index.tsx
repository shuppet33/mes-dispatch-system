import {reatomComponent} from "@reatom/npm-react";
import {Layout} from "../layout";
import {Button, Modal, Tabs, Title} from "@mantine/core";
import {useState} from "react";
import {AddUserForm} from "./add-user-form.tsx";
import type {Service} from "../../components/requests-table/types.ts";
import {UserTable} from "./users-table.tsx";
import {RequestTable} from "../../components/requests-table";
import {
    createUserAsync,
    deleteUserAsync,
    getRequestsListAsync,
    getRequestsListResource,
    getUserListAsync,
    getUsersListResource
} from './model.ts'
import {ROLE_TO_ID} from "../../shared/api/pattern.ts";
import type {Role} from "../../shared/types/auth.ts";

export const mockServices: Service[] = [
    {id: 1, name: 'Скорая', description: 'Скорая помощь типо'},
    {id: 2, name: 'Полиция', description: 'Полиция помощь типо'},
]


export const AdminPages = reatomComponent(({ctx}) => {
    const [opened, setOpened] = useState(false);

    const usersList = ctx.spy(getUsersListResource.dataAtom)
    const isPendingUsers = ctx.spy(getUserListAsync.statusesAtom).isPending
    const {isPending: isDeleting} = ctx.spy(deleteUserAsync.statusesAtom)

    const requestsList = ctx.spy(getRequestsListResource.dataAtom)
    const isPendingRequests = ctx.spy(getRequestsListAsync.statusesAtom).isPending

    ctx.spy(createUserAsync.onFulfill, () => {
        setOpened(false);
    });


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
                        {isPendingUsers ?
                            ('Загрузка') :
                            (
                                <UserTable users={usersList} onDelete={(id) => deleteUserAsync(ctx, id)}
                                           isDeleting={isDeleting}/>
                            )}
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value="requests" pt="xs">
                    <div>
                        {isPendingRequests ?
                            ('Загрузка') :
                            (
                                <RequestTable
                                    services={mockServices}
                                    requests={requestsList}
                                    onDelete={(id: number) => console.log('LOOOG удалена запись в таблице', id)}
                                    showDispatcherColumn={true}
                                />
                            )
                        }
                    </div>
                </Tabs.Panel>
            </Tabs>

            <Modal opened={opened} onClose={() => setOpened(false)} title="Создать пользователя">
                <AddUserForm onCancel={() => setOpened(false)} onSubmit={(values) => {
                    createUserAsync(ctx, {
                        role: ROLE_TO_ID[values.role as Role],
                        login: values.login,
                        password: values.password,
                        full_name: values.full_name,
                    })
                    setOpened(false);
                }}/>
            </Modal>
        </Layout>
    )
}, 'AdminPages');

