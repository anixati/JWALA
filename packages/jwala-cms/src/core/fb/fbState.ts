import { createContext, useState, useEffect } from "react";
import { Fbs } from ".";

export interface IAuthState {
    user?: firebase.User;
    isAdmin: boolean;
    roles?: Array<string>;
    loading: boolean;
}

export const authContext = createContext<IAuthState>({} as IAuthState);
export const useAuthState = () => {
    const [state, setState] = useState<IAuthState>(() => {
        const user = Fbs.ctx.Auth.User;
        return { user, loading: !user } as IAuthState;
    });
    useEffect(() => {
        const unsubscribe = Fbs.ctx.Auth.Svc.onAuthStateChanged(usr => {
            let user: any = undefined;
            let isAdmin = false;
            let loading = false;
            if (usr) {
                user = usr;
            }
            setState({ user, isAdmin, loading });
        });
        return () => unsubscribe();
    }, []);
    return state;
};
