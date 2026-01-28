import {api} from "./instance.ts";


export const getServicesList = api.get('/service/list').then(res => res.data)