import {atom} from "@reatom/framework";

export const accessTokenAtom = atom<string | null>(null, 'tokenAtom');
export const refreshTokenAtom = atom<string | null>(null, 'tokenAtom');
export const isAuthAtom = atom<boolean>(false, 'isAuthAtom');
export const usernameAtom = atom<string | null>(null, 'usernameAtom');