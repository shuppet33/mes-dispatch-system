export type CreateRequest = {
    dispatcher_id: number;
    service_id: number;
    caller_full_name: string;
    caller_phone: string;
    settlement: string;
    address: string;
    priority_id: number;
    description?: string; // необязательное
};