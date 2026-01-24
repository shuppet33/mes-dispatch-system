import {reatomComponent} from "@reatom/npm-react";
import {Layout} from "../layout";
import {Button, Modal, Title} from "@mantine/core";
import {useState} from "react";
import {RequestTable} from "../../components/requests-table";


export const DispatcherPage = reatomComponent(({ctx}) => {
    const [opened, setOpened] = useState(false);

    return (
        <Layout>
            <Title order={2}>Диспетчер</Title>

            <Button mt="md" onClick={() => setOpened(true)}>Создать заявку</Button>


            <RequestTable
                style={{marginTop: '16px'}}
                requests={[]}
                services={[]}
                onDelete={() => {
                }}
                onEdit={() => {
                }}
            />

            <Modal opened={opened} onClose={() => setOpened(false)}>
                заявка типо
            </Modal>
        </Layout>
    )
}, 'DispatcherPage')