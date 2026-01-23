import {atom} from "@reatom/framework";
import type {Role} from '../types/auth.ts'

export const accessTokenAtom = atom<string | null>(null, 'tokenAtom');

export const isAuthAtom = atom<boolean>(false, 'isAuthAtom');

export const userNameAtom = atom<string | null>(null, 'userNameAtom');
export const userRoleAtom = atom<Role | null>(null, 'userRoleAtom');