import React, { ReactNode } from "react";
import { Panel } from 'rsuite';
import LoadingOverlay from 'react-loading-overlay';

export interface ImgPanelProps {
    header: ReactNode;
    loading: boolean;
    loadingStr?: string
}

export const ImgPanel: React.FC<ImgPanelProps> = (rx) => {
    return (

        <LoadingOverlay active={rx.loading} spinner text={rx.loadingStr ? rx.loadingStr : "loading ..."} >
            <Panel header={rx.header} bordered style={{ backgroundColor: '#fff' }}>
                {rx.children}
            </Panel>
        </LoadingOverlay >

    );
};
