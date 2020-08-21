import React, { useContext } from "react";
import { Icon, Header, Navbar, Nav } from "rsuite";
import { PageNav } from "./pageNav";

export const PageHdr: React.FC = () => {
    return (
        <Header >
            <PageNav />
            <Navbar appearance="subtle" classPrefix="jpagenav">
                <Navbar.Header>
                    <div className="jheader">
                        <h5 className="jtitle">Page Header</h5>
                        <p>page desc</p>
                    </div>
                </Navbar.Header>
                <Navbar.Body>
                    <Nav >
                    </Nav>
                    <Nav pullRight>
                        <Nav.Item icon={<Icon icon="cog" />}>Settings</Nav.Item>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        </Header>
    );
};
