import { createContext, useContext } from "react";
import { configure } from "mobx";
import { ContactStore } from "./contacts";
import { AccountStore } from "./accounts";
import 'mobx-react/batchingForReactDom';

configure({ enforceActions: 'never'});

export const StoreContext = createContext({
    //core: new AppStore(),
    accStore: new AccountStore(),
    cntStore: new ContactStore(),

});
export const useStore = () => {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error('Store must be used within a StoreProvider.')
    }
    return store
}
