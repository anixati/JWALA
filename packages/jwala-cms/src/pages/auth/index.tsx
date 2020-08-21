import { LoginPage } from "./login";
import { ResetPage } from "./reset";
import React from "react";
import { FlexboxGrid, Col } from "rsuite";
import { MsgLayout } from "../../layouts/msgLayout";
import { Outlet, Routes, Route } from "react-router";

const AuthPage: React.FC = () => {
    return (
        <MsgLayout>
            <FlexboxGrid justify="center">
                <FlexboxGrid.Item componentClass={Col} colspan={6} md={6} sm={12} xs={24} >
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/reset" element={<ResetPage />} />
                    </Routes>
                    <Outlet />
                </FlexboxGrid.Item>

            </FlexboxGrid>
        </MsgLayout>
    );
};
export default AuthPage;