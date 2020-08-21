import React from "react";
import { Content, Footer, Header } from 'rsuite';
import { SiteFtr } from "./components/siteFtr";
import { SiteLayout } from "./siteLayout";
export const MsgLayout: React.FC = ({ children }) => {
    return (
        <SiteLayout>
            <Header>
                <div className="jpanel">
                    <p>&nbsp;</p>
                </div>
            </Header>
            <Content>
                {children}
            </Content>
            <Footer>
                <SiteFtr />
            </Footer>
        </SiteLayout>
    );
};


