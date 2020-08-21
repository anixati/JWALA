
import React, { ReactNode } from "react";
import LoadingOverlay from 'react-loading-overlay';
import { ButtonToolbar, Content, FlexboxGrid, Header } from 'rsuite';

export interface ViewPanelProps {
    leftCmds?: ReactNode;
    rightCmds?: ReactNode;
    centerCmds?: ReactNode;
    loading: boolean;
    loadingStr?: string
}

export const ViewPanel: React.FC<ViewPanelProps> = (rx) => {
    return (

        <Content className="jwzpnl">
            <Header className="jwzbar">
                <FlexboxGrid align="middle">
                    <FlexboxGrid.Item colspan={6}>
                        {rx.leftCmds && <ButtonToolbar >
                            {rx.leftCmds}
                        </ButtonToolbar>}
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={12}>
                        {rx.centerCmds && <div className="centered">
                            {rx.centerCmds}
                        </div>}
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={6}>
                        {rx.rightCmds && <ButtonToolbar style={{ float: 'right' }}>
                            {rx.rightCmds}
                        </ButtonToolbar>}
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Header>
            <Content className="jwzform">
                <LoadingOverlay active={rx.loading} spinner text={rx.loadingStr ? rx.loadingStr : "loading ..."} >
                    {rx.children}
                </LoadingOverlay >
            </Content>
        </Content>
    );
};
