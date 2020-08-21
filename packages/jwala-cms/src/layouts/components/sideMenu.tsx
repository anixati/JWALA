import React, { useState } from "react";
import { Nav, Icon, Sidenav, Sidebar, ButtonToolbar, IconButton, Dropdown } from "rsuite";
import { useNavigate } from "react-router";

export const SideMenu: React.FC = () => {
    let navigate = useNavigate();
    const [activeKey, setActiveKey] = useState('home');
    const [expanded, setExpanded] = useState(true);
    const handleKey = (e) => {
        setActiveKey(e);
        navigate(e);
    };
    const toggleExpand = () => {
        setExpanded(!expanded)
    };
    return (
        <Sidebar style={{ display: 'flex', flexDirection: 'column', minHeight: '600' }}
            width={expanded ? 210 : 56}
            collapsible>
            <ButtonToolbar>
                <IconButton onClick={toggleExpand} circle size="xs" style={{ marginLeft: '10px' }}
                    icon={<Icon icon={expanded ? 'angle-left' : 'angle-right'} />} />
            </ButtonToolbar>
            <Sidenav expanded={expanded} activeKey={activeKey} onSelect={handleKey} >
                <Sidenav.Body>
                    <Nav>
                        <Nav.Item eventKey="home" icon={<Icon icon="dashboard" />}>Dashboard</Nav.Item>
                        <Nav.Item eventKey="sites" icon={<Icon icon="frame" />}>Sites</Nav.Item>
                        <Nav.Item eventKey="content" icon={<Icon icon="frame" />}>Schema's</Nav.Item>
                        <Dropdown eventKey="3" title="Administration" icon={<Icon icon="cogs" />}>
                            <Dropdown.Item eventKey="accounts" icon={<Icon icon="file-powerpoint-o" />}>Accounts</Dropdown.Item>
                            <Dropdown.Item eventKey="users" icon={<Icon icon="user-circle-o" />}>Users</Dropdown.Item>
                        </Dropdown>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </Sidebar>
    );
};
