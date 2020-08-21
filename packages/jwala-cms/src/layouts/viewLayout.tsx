import React, { ReactNode } from "react";
import { Header, Navbar, Nav, Content } from "rsuite";
import { PageNav } from "./components/pageNav";
import  LoadingOverlay  from 'react-loading-overlay';

export interface ViewProps {
    title: string;
    desc?: string;
    loading: boolean;
    loadingStr?: string
    pagenav?: ReactNode;
}

export const ViewLayout: React.FC<ViewProps> = (rx) => {
    return (
        <>
            <Header>
                <PageNav />
                <Navbar appearance="subtle" className="jpagenav">
                    <Navbar.Header>
                        <div className="jheader">
                            <h5 className="jtitle">{rx.title}</h5>
                            <p>{rx.desc}</p>
                        </div>
                    </Navbar.Header>
                    <Navbar.Body>
                        <Nav >
                        </Nav>
                        <Nav pullRight>
                            {rx.pagenav}
                        </Nav>
                    </Navbar.Body>
                </Navbar>
            </Header>
            <Content>
                <LoadingOverlay active={rx.loading} spinner text={rx.loadingStr ? rx.loadingStr : "loading ..."}>
                    <div className="jview">
                        {rx.children}
                    </div>
                </LoadingOverlay>
            </Content>
        </>
    );
};




