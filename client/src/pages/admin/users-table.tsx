import {useMemo, useState} from 'react';
import {ActionIcon, Select, Table, TextInput, Tooltip} from '@mantine/core';
import {IconTrash} from '@tabler/icons-react';
import type {User} from './types';
import type {RoleId} from '../../shared/api/types';
import {ROLE_PATTERN, ROLE_RUS} from "../../shared/api/pattern.ts";

type UserTableProps = {
    users: User[];
    onDelete: (id: number) => void;
};

export const UserTable = ({users, onDelete}: UserTableProps) => {
    const [filters, setFilters] = useState({
        id_user: '',
        login: '',
        full_name: '',
        role_id: '',
    });

    const [expandedId, setExpandedId] = useState<number | null>(null);

    // --- Фильтрация ---
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            if (filters.id_user && !user.id_user.toString().includes(filters.id_user)) return false;
            if (filters.login && !user.login.toLowerCase().includes(filters.login.toLowerCase())) return false;
            if (filters.full_name && !user.full_name.toLowerCase().includes(filters.full_name.toLowerCase())) return false;
            if (filters.role_id && user.role_id !== Number(filters.role_id)) return false;
            return true;
        });
    }, [users, filters]);

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters((prev) => ({...prev, [key]: value}));
    };

    // --- Получение русского названия роли ---
    const getRoleRus = (roleId: RoleId): string => {
        const roleKey = ROLE_PATTERN[roleId];
        return ROLE_RUS[roleKey as keyof typeof ROLE_RUS];
    };

    return (
        <Table striped highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>
                        <TextInput
                            size="xs"
                            placeholder="ID"
                            value={filters.id_user}
                            onChange={(e) => handleFilterChange('id_user', e.target.value)}
                        />
                    </Table.Th>
                    <Table.Th>
                        <TextInput
                            size="xs"
                            placeholder="Логин"
                            value={filters.login}
                            onChange={(e) => handleFilterChange('login', e.target.value)}
                        />
                    </Table.Th>
                    <Table.Th>
                        <TextInput
                            size="xs"
                            placeholder="ФИО"
                            value={filters.full_name}
                            onChange={(e) => handleFilterChange('full_name', e.target.value)}
                        />
                    </Table.Th>
                    <Table.Th>
                        <Select
                            size="xs"
                            placeholder="Роль"
                            data={[
                                {value: '1', label: 'Админ'},
                                {value: '2', label: 'Диспетчер'},
                                {value: '3', label: 'Служба'},
                            ]}
                            value={filters.role_id}
                            onChange={(value) => handleFilterChange('role_id', value || '')}
                        />
                    </Table.Th>
                    <Table.Th></Table.Th> {/* Удалить */}
                </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
                {filteredUsers.length === 0 ? (
                    <Table.Tr>
                        <Table.Td colSpan={5} ta="center">
                            Пользователей нет
                        </Table.Td>
                    </Table.Tr>
                ) : (
                    filteredUsers.map((user) => {
                        const isExpanded = expandedId === user.id_user;

                        return (
                            <>
                                <Table.Tr
                                    key={user.id_user}
                                    onClick={() => setExpandedId(isExpanded ? null : user.id_user)}
                                    style={{cursor: 'pointer'}}
                                >
                                    <Table.Td>{user.id_user}</Table.Td>
                                    <Table.Td>{user.login}</Table.Td>
                                    <Table.Td>{user.full_name}</Table.Td>
                                    <Table.Td>{getRoleRus(user.role_id)}</Table.Td>
                                    <Table.Td onClick={(e) => e.stopPropagation()}>
                                        <Tooltip label="Удалить">
                                            <ActionIcon
                                                variant="light"
                                                color="red"
                                                onClick={() => onDelete(user.id_user)}
                                            >
                                                <IconTrash size={16}/>
                                            </ActionIcon>
                                        </Tooltip>
                                    </Table.Td>
                                </Table.Tr>

                                {isExpanded && (
                                    <Table.Tr>
                                        <Table.Td colSpan={5}>
                                            <div style={{padding: '12px', background: '#f9f9f9', borderRadius: '4px'}}>
                                                <p><strong>Телефон:</strong> {user.phone}</p>
                                                <p><strong>Создан:</strong> {new Date(user.created_at).toLocaleString()}
                                                </p>
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>
                                )}
                            </>
                        );
                    })
                )}
            </Table.Tbody>
        </Table>
    );
};