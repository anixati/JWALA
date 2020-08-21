import { observer, useLocalStore } from "mobx-react";
import React, { createContext, useContext, useState } from "react";
import { Icon, Nav } from "rsuite";


export interface ITabInfo {
    id: string;
    title: string;
    icon?: any;
}
export function createTab() {
    return {
        tabId: "0",
        tabs: new Array<ITabInfo>(),
        get currentTab(){ return this.tabId;},
        init: function (items: Array<ITabInfo> | null | undefined) {
            if (items) this.tabs = items;
        },
        isActive: function (id: string) {
            return (this.tabId) ? this.tabId === id : false;
        },
        setActive: function (id: string) {
            this.tabId = id;
        }
    }
}
const tabContext = createContext<ReturnType<typeof createTab> | null>(null);
export const useTabs = () => {
    const context = useContext(tabContext);
    if (!context)
        throw new Error('Must be used within a Tabs.');
    return context;
};
export const Tab: React.FC<ITabInfo> = observer((rx) => {
    const ctx = useTabs();
    return ctx.isActive(rx.id) ? <div className="jwzstep">{rx.children}</div> : null;
});
const TabPanelNav: React.FC<{}> = observer((rx) => {
    const styles = { marginBottom: 5 };
    const ctx = useTabs();
    const onSelected = (evk, ev) => {
        ctx.setActive(evk);
    }
    return (
        <Nav appearance="subtle" activeKey={ctx.currentTab} onSelect={onSelected} style={styles}>
            {ctx.tabs.map((item, index) => (
                <Nav.Item eventKey={item.id} key={index}
                    icon={(item.icon) ? <Icon icon={item.icon} /> : undefined}>
                    {item.title}
                </Nav.Item>
            ))}
        </Nav>
    );
});
export interface TabPanelProps { }
export const TabPanel: React.FC<TabPanelProps> = observer((rx) => {
    if (!rx.children) return null;
    const tabs = React.Children.map(rx.children, (cd) => { return { ...cd.props } as ITabInfo });
    const store = useLocalStore(createTab);
    store.init(tabs);
    return (
        <tabContext.Provider value={store}>
            <TabPanelNav />
            {rx.children}
        </tabContext.Provider>
    );
});