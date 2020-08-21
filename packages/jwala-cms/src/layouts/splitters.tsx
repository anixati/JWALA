import React, { ReactNode } from "react";
import SplitPane from 'react-split-pane';

export const LeftSplitPanel: React.FC<{ leftNode: ReactNode }> = (rx) => {
    return (

        <SplitPane split="vertical" defaultSize="75%">
            <div>
                {rx.children}
            </div>
            <div >
                {rx.leftNode}
            </div>
        </SplitPane>
    );
};
