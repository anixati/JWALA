import React from "react";
import { NotifyPanel } from "../../layouts/notifyPanel";
import { Icon, Button } from "rsuite";
import { useNavigate } from "react-router-dom";
export const NotFound: React.FC = () => {
    let navigate = useNavigate();
    return (
        <NotifyPanel title="Page not found!" desc="Page you are looking not found!" icon={
            <div className="jpanel" >
                <Icon icon='hand-stop-o' size="5x" />
                <br />
                <br />
                <Button appearance="primary" onClick={() => {navigate('/'); }} >Back to Home</Button>
            </div>
        } >

        </NotifyPanel>
    );
};



