import React from "react";
import { Container, Header } from 'rsuite';
import { SideMenu } from "./components/sideMenu";
import { SiteHdr } from "./components/siteHdr";
import { SiteLayout } from "./siteLayout";

export const PageLayout: React.FC = ({ children }) => {
    return (
        <SiteLayout>
            <Header className="jnavbar">
                <SiteHdr />
            </Header>
            <Container style={{ minHeight: '94vh'}}>
                <SideMenu />
                <Container>
                    {children}
                </Container>
            </Container>
        </SiteLayout>
    );
}