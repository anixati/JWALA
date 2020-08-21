import React, { ReactNode } from "react";
import { Content, FlexboxGrid, Panel } from "rsuite";
import { MsgLayout } from "./msgLayout";

export interface NotifyPanelProps {
    title: string;
    icon: ReactNode;
    desc: string;
}

export const NotifyPanel: React.FC<NotifyPanelProps> = (rx) => {
    return (
        <MsgLayout>
            <FlexboxGrid justify="center">
                <FlexboxGrid.Item colspan={12}>
                    <Panel header={<h3 style={{ textAlign:"center"}}>{rx.title}</h3>} bordered>
                        <Content>{rx.icon}</Content>
                        <div className="jcenter">
                            <p>{rx.desc}</p>
                        </div>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </MsgLayout>
    );
};
