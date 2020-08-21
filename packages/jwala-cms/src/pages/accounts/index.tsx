import { observer } from "mobx-react";
import React from "react";
import { ViewLayout, SplitLayout } from "../../layouts";
import { useStore } from "../../stores";
import { EntityList } from "./list";
import { Outlet, Routes, Route } from "react-router";
import { ViewEntity } from "./view";
import { NewEntity } from "./new";


const DefaultView: React.FC = () => {
    return (
        <h1>Default </h1>
    )
}

export const AccountsPage: React.FC = observer(() => {
    const { accStore } = useStore();
    return (
        <ViewLayout title="Accounts" desc="Acoounts Management" loading={accStore.isLoading}>
            <SplitLayout list={<EntityList />}>
                <Routes>
                    <Route path="/" element={<DefaultView />} />
                    <Route path=":id" element={<ViewEntity />} />
                    <Route path="new" element={<NewEntity />} />
                </Routes>
                <Outlet />
            </SplitLayout>
        </ViewLayout>
    );
});