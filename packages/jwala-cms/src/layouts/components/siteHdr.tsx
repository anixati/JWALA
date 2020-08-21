import React from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Icon, Nav, Navbar } from "rsuite";
import { useAuthState, Fbs } from "../../core";


export const SiteHdr: React.FC = () => {
    const state = useAuthState();
    const navigate = useNavigate();
    const usrName = `${state.user!.email}`;
    const handleKey = (key, e) => {
        switch (key) {
            case "logout": {
                Fbs.ctx.Auth.signout().then(() => {
                    navigate(`/login`);
                });
                break;
            }
            default: {
                navigate(`/modal/${key}`, { state: { modal: true } });
            }
        }
    };
    return (
        <Navbar appearance="inverse">
            <Navbar.Header>
                <h5 className="jbrand logo"> <Icon icon='sun-o' size="lg" />&nbsp;Jwala CMS</h5>
            </Navbar.Header>
            <Navbar.Body>
                <Nav pullRight style={{ marginRight: '10px' }}>
                    <Dropdown icon={<Icon icon="user" />} placement="bottomEnd" >
                        <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
                            <p style={{ fontSize: '12px' }}>Signed in as </p>
                            <p style={{ fontStyle: 'bold' }}>{usrName}</p>
                        </Dropdown.Item>
                        <Dropdown.Item divider />
                        <Dropdown.Item icon={<Icon icon="user" />} eventKey="profile" onSelect={handleKey}>My Profile</Dropdown.Item>
                        <Dropdown.Item icon={<Icon icon="cog" />} eventKey="settings" onSelect={handleKey}>Settings</Dropdown.Item>
                        <Dropdown.Item icon={<Icon icon="info" />} eventKey="about" onSelect={handleKey}>About</Dropdown.Item>
                        <Dropdown.Item divider />
                        <Dropdown.Item icon={<Icon icon="sign-out" />} eventKey="logout" onSelect={handleKey}>Sign out</Dropdown.Item>
                    </Dropdown>
                </Nav>
            </Navbar.Body>
        </Navbar>
    );
};



