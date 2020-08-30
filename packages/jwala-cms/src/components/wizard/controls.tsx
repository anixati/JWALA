import React from "react";
import { Header, Steps } from "rsuite";
import { useWzd } from "./context";
import { ViewPanel } from "../../layouts";
import { useFormikContext } from "formik";
import {JsonTable} from 'react-json-to-html';


export const WzdProgress: React.FC<{ status: boolean }> = (rx) => {
    const wzd = useWzd();
    return (
        <Header className="jprocess">
            <Steps current={wzd.index} currentStatus={rx.status ? "error" : "process"} small>
                {wzd.steps.map((item, index) => (
                    <Steps.Item key={index} title={item.title} />
                ))}
            </Steps>
        </Header>
    );
};

export const WzdSummary: React.FC = () => {
    const { values } = useFormikContext();
    return (
        <div className="jwzstep">
            <h2>Summary</h2>
            <JsonTable json={values} />
        </div>
    );
};



export const WzdHelp: React.FC = () => {
    // const wzd = useWzd();
    return (
        <ViewPanel leftCmds={<h5>Help</h5>} loading={false}>
        </ViewPanel>
    );
};