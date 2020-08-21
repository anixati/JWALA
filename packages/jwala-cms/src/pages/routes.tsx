import React from "react";
import { RouteProps } from "react-router";
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { RootPage } from ".";
import { AccountsPage } from "./accounts";
import { UsersPage } from "./admin/users";
import AuthPage from "./auth";
import { NotFound } from "./common/notFound";
import { SchemaPage } from "./content";
import { DefaultPage } from "./home";
import { ModalRoot } from "./modals";
import { SitesPage } from "./sites";
import { useAuthState } from "../core";


const AuthRoute: React.FC<RouteProps> = (rx) => {
    const state = useAuthState();
    const noCred = state.user === undefined || state.user == null;
    if (noCred) {
        return <Navigate to="/login" replace />
    }
    return <Route path={rx.path} element={rx.element} >{rx.children}</Route>
}

export const AppRoutes: React.FC = () => {
    const location = useLocation();
    let isModal = location.state && location.state.modal;

    return (
        <Routes>
            <AuthRoute path="/" element={<RootPage />} >
                <AuthRoute path="" element={<DefaultPage />} />
                <AuthRoute path="home" element={<DefaultPage />} />
                <AuthRoute path="accounts/*" element={<AccountsPage />} >

                </AuthRoute>
                <AuthRoute path="users" element={<UsersPage />} >

                </AuthRoute>
                <AuthRoute path="sites" element={<SitesPage />} />
                <AuthRoute path="content" element={<SchemaPage />} />
            </AuthRoute>
            <Route path="login/*" element={<AuthPage />} />
            {isModal &&
                <Route path="/modal/:id" element={<ModalRoot />} />
            }
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
