import { observer } from "mobx-react";
import React from "react";
import { Content, Header, Icon, IconButton } from "rsuite";
import { CommandBar } from "./commandBar";

export interface DataViewPanelProps {

}
export const DataViewPanel: React.FC<DataViewPanelProps> = observer((rx) => {
    const onAssign = () => { }
    const onShare = () => { }
    const OnRefresh = () => { }
    const onPrint = () => { }
    return (
        <div>
            <Header className="jtoolbar">
                <CommandBar onAssign={onAssign} onPrint={onPrint} onShare={onShare} onRefresh={OnRefresh}>
                    <IconButton icon={<Icon icon="pause" />} placement="left" size="sm" >Save</IconButton>
                </CommandBar>
            </Header>
            <Content>
                {rx.children}
            </Content>
        </div>
    );
});