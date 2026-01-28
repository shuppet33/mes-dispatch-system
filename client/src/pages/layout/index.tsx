import {AppShell, Button, Group} from "@mantine/core";
import {reatomComponent} from "@reatom/npm-react";
import {accessTokenAtom, isAuthAtom, userRoleAtom} from "../../shared/auth/model.ts";
import type {FC, ReactNode} from "react";
import {logOutAsync} from "../auth/model.ts";
import {useNavigate, useSearch} from "@tanstack/react-router";
import {ROLE_ROUTES} from "../../shared/routes";
import type {Role} from "../../shared/types/auth.ts";

export const Layout: FC<{ children: ReactNode }> = reatomComponent(({ctx, children}) => {
    const role = ctx.get(userRoleAtom);
    const navigate = useNavigate()

    useSearch({from: `/protectedLogin${ROLE_ROUTES[role as Role] ?? ''}`});

    const LogOut = async () => {
        await logOutAsync(ctx)
        await navigate({to: '/login'});

        isAuthAtom(ctx, false)
        accessTokenAtom(ctx, null)
    }

    return (
        <AppShell
            header={{height: 60}}
            padding="md"
        >

            <AppShell.Header>
                <Group h="100%" px="md" justify="end">
                    <div style={{paddingRight: '16px'}}>
                        <Button onClick={LogOut} variant="filled">
                            Выйти
                        </Button>
                    </div>
                </Group>
            </AppShell.Header>

            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    )
})