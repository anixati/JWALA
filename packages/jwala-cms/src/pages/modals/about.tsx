import React, { useContext } from "react";
import { mdlContext } from "../../core";
import { Modal, Grid, Row, Col, Panel, Button, FlexboxGrid } from "rsuite";
import logo from "../../images/about.png";

export const AboutModal: React.FC = () => {
    const context = useContext(mdlContext);
    const onClose = () => {
        context.onClose();
    };
    return (
        <Modal show={context.show} onHide={onClose} backdrop>
            <Grid fluid>
                <Row>
                    <Col xs={12}>
                        <img src={logo} height={250} width={250} />
                    </Col>
                    <Col xs={12}>
                        <Panel>
                            <dl>
                                <dt>Application</dt><dd>Jwala CMS</dd>
                                <dt>Version</dt><dd>11.</dd>
                                <dt>Build Number</dt><dd>11.</dd>
                            </dl>
                           <br/><br/>
                            <FlexboxGrid justify="end">
                                <FlexboxGrid.Item colspan={6}>
                                    <Button appearance="primary" onClick={onClose}>Close</Button>
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        </Modal>
    );
};
