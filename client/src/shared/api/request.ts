import {api} from "./instance.ts";


export const getRequestsList = () => api.get('/requests/list').then(res => res.data)
