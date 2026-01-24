import {api} from "./instance.ts";
import type {UserSubmitData} from "../../pages/admin/types.ts";


export const userDelete = (id: number) => api.delete(`/user/${id}`).then(res => res.data);

export const getUsersList = () => api.get('/users/list').then(res => res.data)

export const postCreateUser = (user: UserSubmitData) => api.post('/user', user).then(res => res.data)