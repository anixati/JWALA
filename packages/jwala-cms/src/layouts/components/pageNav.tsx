import React from "react";
import { Breadcrumb, Icon } from "rsuite";
import { Link } from "react-router-dom";


const NavCrumb = (props) => <Breadcrumb.Item componentClass={Link} {...props} />;

export const PageNav: React.FC = () => {
    

    return (
        <div>
            <Breadcrumb>
                <NavCrumb to="/home" replace ><Icon icon='home'/>&nbsp;Home</NavCrumb>
                <Breadcrumb.Item>Components</Breadcrumb.Item>
                <Breadcrumb.Item active>Breadcrumb</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
};



