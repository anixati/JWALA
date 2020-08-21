import React from "react";
import { PageLayout } from "../layouts/pageLayout";
import { Outlet } from "react-router";

export const RootPage: React.FC = () => {
    return (
        <PageLayout>
           <Outlet />
        </PageLayout>
    );
};
