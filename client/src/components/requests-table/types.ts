import {PRIORITY_PATTERN, type STATUS_PATTERN} from "../../shared/api/pattern.ts";

export type Service = {
    id: number;
    name: string;
    description: string;
};

export type Request = {
    id_request: number;
    dispatcher_id: number;
    service_id: number;
    caller_full_name: string;
    caller_phone: string;
    settlement: string;
    address: string;
    status_id: keyof typeof STATUS_PATTERN;
    priority_id: keyof typeof PRIORITY_PATTERN;
    description: string;
    created_at: string;
    updated_at: string;
    closed_at: string;
};
