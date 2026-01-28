import {reatomAsync, reatomResource, withDataAtom, withReset, withStatusesAtom} from "@reatom/framework";
import {getUsersList, postCreateUser, userDelete} from "../../shared/api/user.ts";
import type {UserSubmitData} from "./types.ts";
import {getRequestsList} from "../../shared/api/request.ts";
import {getServicesList} from "../../shared/api/service.ts";

export const deleteUserAsync = reatomAsync((ctx, id: number) => {
    return ctx.schedule(async () => {
        return await userDelete(id)
    })
}).pipe(withStatusesAtom())

export const createUserAsync = reatomAsync((ctx, user: UserSubmitData) => {
    return ctx.schedule(async () => {
        return await postCreateUser(user)
    })
}).pipe(withStatusesAtom())

export const getUserListAsync = reatomAsync((ctx) => {
    return ctx.schedule(async () => {
        return await getUsersList()
    })
}).pipe(withStatusesAtom())

export const getUsersListResource = reatomResource((ctx) => {
    ctx.spy(deleteUserAsync.onFulfill)
    ctx.spy(createUserAsync.onFulfill)

    return ctx.schedule(async () => {
        return getUserListAsync(ctx);
    })
}).pipe(withDataAtom([]), withStatusesAtom(), withReset())


export const getRequestsListAsync = reatomAsync((ctx) => {
    return ctx.schedule(async () => {
        return await getRequestsList()
    })
}).pipe(withDataAtom([]), withStatusesAtom())

export const getRequestsListResource = reatomResource((ctx) => {
    return ctx.schedule(async () => {
        return getRequestsListAsync(ctx);
    })
}).pipe(withDataAtom([]), withStatusesAtom(), withReset())



const getServicesListAsync = reatomAsync((ctx) => {
    return ctx.schedule(async () => await getServicesList());
}).pipe(withStatusesAtom());


export const getServicesListResource = reatomResource((ctx) => {
    // ctx.spy(deleteServicesAsync.onFulfill)
    // ctx.spy(createServicesAsync.onFulfill)

    return ctx.schedule(async () => {
        return getServicesListAsync(ctx);
    })
}).pipe(withDataAtom([]), withStatusesAtom(), withReset())
