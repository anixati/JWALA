import { observer } from "mobx-react";
import React from "react";
import Moment from 'react-moment';
import { Content, FlexboxGrid, Header, Icon } from "rsuite";
import { SearchBar } from ".";

export interface DataItemListProps {
    onSearch(inpStr: string): void;
    onNew(): void;
}
export const DataItemList: React.FC<DataItemListProps> = observer((rx) => {
    return (
        <>
            <Header className="jtoolbar">
                <SearchBar onSearch={e => rx.onSearch(e)} onNew={rx.onNew} />
            </Header>
            <Content>
                {rx.children}
            </Content>
        </>
    );
});


export interface DataListItemProps {
    descVal: string,
    auditVal: Date,
    alert: boolean,
    iconName?: string
}
export const DataListItem: React.FC<DataListItemProps> = (rx) => {
    const auditDateStr =`${rx.auditVal.toISOString()}`;
    return (
        <FlexboxGrid align="middle">
            <FlexboxGrid.Item colspan={3} className="jlistIcon">
                <Icon icon="folder-o"  size="2x" />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={21} className="jlistItem">
                <div className="jlistItem">{rx.children}</div>
                <div >
                    <div className="jdesc">
                        {rx.descVal}
                    </div>
                    <div className="jaudit">
                       Modified <Moment fromNow>{auditDateStr}</Moment> 
                    </div>
                </div>
            </FlexboxGrid.Item>
        </FlexboxGrid>
    );
}
