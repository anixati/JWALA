import React from "react";
import { NotifyPanel } from "../../layouts/notifyPanel";
import { Icon } from "rsuite";


export const NotAuthorised: React.FC = () => {
    return (
        <NotifyPanel title="Not Authorised!" desc="you are not authoried to access this page!" icon={<div>
             <Icon icon='hand-stop-o' size="5x" />
        </div>}></NotifyPanel>
    );
};
