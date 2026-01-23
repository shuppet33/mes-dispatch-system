import { useState, useMemo } from 'react';
import {Table, TextInput, Select, Tooltip, ActionIcon} from '@mantine/core';
import type { Request, Service } from './types';
import {PRIORITY_PATTERN, STATUS_PATTERN} from '../../shared/api/pattern';
import { IconTrash } from '@tabler/icons-react';

type RequestTableProps = {
    requests: Request[];
    services: Service[];
    onDelete: (id: number) => void,
};

export const RequestTable = ({ requests, services, onDelete }: RequestTableProps) => {

    const [filters, setFilters] = useState({
        id_request: '',
        dispatcher_id: '',
        service_id: '',
        settlement: '',
        status_id: '',
        priority_id: '',
    });


    const [expandedId, setExpandedId] = useState<number | null>(null);


    const filteredRequests = useMemo(() => {
        return requests.filter((req) => {
            if (filters.id_request && !req.id_request.toString().includes(filters.id_request)) return false;
            if (filters.dispatcher_id && !req.dispatcher_id.toString().includes(filters.dispatcher_id)) return false;
            if (filters.service_id && req.service_id !== Number(filters.service_id)) return false;
            if (filters.settlement && !req.settlement.toLowerCase().includes(filters.settlement.toLowerCase())) return false;
            if (filters.status_id && req.status_id !== Number(filters.status_id)) return false;
            if (filters.priority_id && req.priority_id !== Number(filters.priority_id)) return false;
            return true;
        });
    }, [requests, filters]);


    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };


    const serviceOptions = services.map((s) => ({ value: s.id.toString(), label: s.name }));

    return (
        <Table striped highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>
                        <TextInput
                            size="xs"
                            placeholder="ID заявки"
                            value={filters.id_request}
                            onChange={(e) => handleFilterChange('id_request', e.target.value)}
                        />
                    </Table.Th>
                    <Table.Th>
                        <TextInput
                            size="xs"
                            placeholder="ID диспетчера"
                            value={filters.dispatcher_id}
                            onChange={(e) => handleFilterChange('dispatcher_id', e.target.value)}
                        />
                    </Table.Th>
                    <Table.Th>
                        <Select
                            size="xs"
                            placeholder="Служба"
                            data={serviceOptions}
                            value={filters.service_id}
                            onChange={(value) => handleFilterChange('service_id', value || '')}
                        />
                    </Table.Th>
                    <Table.Th>
                        <TextInput
                            size="xs"
                            placeholder="Населённый пункт"
                            value={filters.settlement}
                            onChange={(e) => handleFilterChange('settlement', e.target.value)}
                        />
                    </Table.Th>
                    <Table.Th>
                        <Select
                            size="xs"
                            placeholder="Статус"
                            data={[
                                { value: '1', label: 'Новая' },
                                { value: '2', label: 'В работе' },
                                { value: '3', label: 'Закрыта' },
                                { value: '4', label: 'Отменена' },
                            ]}
                            value={filters.status_id}
                            onChange={(value) => handleFilterChange('status_id', value || '')}
                        />
                    </Table.Th>
                    <Table.Th>
                        <Select
                            size="xs"
                            placeholder="Приоритет"
                            data={[
                                { value: '1', label: 'Низкий' },
                                { value: '2', label: 'Средний' },
                                { value: '3', label: 'Высокий' },
                                { value: '4', label: 'Чрезвычайный' },
                            ]}
                            value={filters.priority_id}
                            onChange={(value) => handleFilterChange('priority_id', value || '')}
                        />
                    </Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
                {filteredRequests.length === 0 ? (
                    <Table.Tr>
                        <Table.Td colSpan={7} ta="center">
                            Заявок нет
                        </Table.Td>
                    </Table.Tr>
                ) : (
                    filteredRequests.map((req) => {
                        const isExpanded = expandedId === req.id_request;

                        return (
                            <>
                                {/* Основная строка */}
                                <Table.Tr
                                    key={req.id_request}
                                    onClick={() => setExpandedId(isExpanded ? null : req.id_request)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Table.Td>{req.id_request}</Table.Td>
                                    <Table.Td>{req.dispatcher_id}</Table.Td>
                                    <Table.Td>
                                        {services.find((s) => s.id === req.service_id)?.name || '—'}
                                    </Table.Td>
                                    <Table.Td>{req.settlement}</Table.Td>
                                    <Table.Td>{STATUS_PATTERN[req.status_id]}</Table.Td>
                                    <Table.Td>{PRIORITY_PATTERN[req.priority_id]}</Table.Td>
                                    <Table.Td onClick={(e) => e.stopPropagation()}> {/* ← останавливаем всплытие, чтобы не срабатывал клик по строке */}
                                        <Tooltip label="Удалить">
                                            <ActionIcon
                                                variant="light"
                                                color="red"
                                                onClick={() => onDelete(req.id_request)}
                                            >
                                                <IconTrash size={16} />
                                            </ActionIcon>
                                        </Tooltip>
                                    </Table.Td>
                                </Table.Tr>

                                {/* Раскрытая деталь */}
                                {isExpanded && (
                                    <Table.Tr>
                                        <Table.Td colSpan={7}>
                                            <div style={{ padding: '12px', background: '#f9f9f9', borderRadius: '4px' }}>
                                                <p><strong>ФИО:</strong> {req.caller_full_name}</p>
                                                <p><strong>Телефон:</strong> {req.caller_phone}</p>
                                                <p><strong>Адрес:</strong> {req.address}</p>
                                                <p><strong>Описание:</strong> {req.description}</p>
                                                <p><strong>Создано:</strong> {new Date(req.created_at).toLocaleString()}</p>
                                                {req.closed_at && <p><strong>Закрыто:</strong> {new Date(req.closed_at).toLocaleString()}</p>}
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