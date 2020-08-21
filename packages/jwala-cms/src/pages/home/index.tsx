import React from "react";
import { ViewLayout } from "../../layouts/viewLayout";
import { TabPanel, Tab } from "../../components";


export const DefaultPage: React.FC = () => {
    return (
        <ViewLayout title="DashBoard" desc="Summary Report" loading={false}>

            <TabPanel>
                <Tab id="0" title="General" >
                    <p>assafs asffasff  safaf</p>
                </Tab>
                <Tab id="1" title="saasf" >
                    <p>assafs asffasff wefweqewf we f ew ge wg ew g  safaf</p>
                </Tab>
                <Tab id="2" title="sdfdsf" icon="home">
                    <p>assafs asffasff wefweqewf we f eegregreg  dg ds bgw ge wg ew g  safaf</p>
                </Tab>

            </TabPanel>

        </ViewLayout>
    );
};