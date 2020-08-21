import React, { ReactNode } from "react";
import { Col, Grid, Row } from "rsuite";

export interface ListViewProps {
    list: ReactNode;
}
///-- deprecated
export const SplitLayout: React.FC<ListViewProps> = (rx) => {
    return (
        <Grid fluid>
            <Row >
                <Col xs={6}>
                    <div className="jcontent">
                        {rx.list}
                    </div>
                </Col>
                <Col xs={18}  >
                    <div className="jcontent">
                        {rx.children}
                    </div>
                </Col>
            </Row>
        </Grid>
    );
};


