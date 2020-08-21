import React from "react";
import { Header, Steps } from "rsuite";
import { useWzd } from "./context";
import { observer } from "mobx-react";
export const WzdProgress: React.FC<{}> = observer((rx) => {
    const wzd = useWzd();
    return (
        <Header className="jprocess">
            <Steps current={wzd.index}>
                {wzd.steps.map((item, index) => (
                    <Steps.Item key={index} title={item.title} description={item.desc} />
                ))}
            </Steps>
        </Header>
    );
});
