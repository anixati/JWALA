import React from "react";
import { useRouteNode } from "react-router5";
import { Icon } from "rsuite";
export const PageNotFound: React.FC = () => {
    return (
        <div className="jpanel" >
            <Icon icon='close-circle' size="5x" />
            <h2>Page not there!</h2>
        </div>
    );
};