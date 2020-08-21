import { observer, useLocalStore } from "mobx-react";
import React from "react";
import { Grid, Row, Col, ButtonToolbar, Whisper, IconButton, Icon, Tooltip, ButtonGroup } from "rsuite";

export interface CmdBarProps {
    onShare(): void;
    onPrint(): void;
    onAssign(): void;
    onRefresh(): void;
}
export const CommandBar: React.FC<CmdBarProps> = observer((rx) => {
    const store = useLocalStore(() => ({
        inputStr: '',
        get canSearch() {
            return (store.inputStr === '') ? false : true;
        },
    }))
    return (
        <Grid fluid>
            <Row>
                <Col xs={18}>
                    <ButtonToolbar>
                        {rx.children}
                    </ButtonToolbar>
                </Col>
                <Col xs={6}>
                    <ButtonToolbar style={{ float: 'right' }}>
                        <ButtonGroup>
                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Assign</Tooltip>}>
                                <IconButton icon={<Icon icon="share-square-o" />} size="sm" onClick={rx.onAssign} />
                            </Whisper>
                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Share</Tooltip>}>
                                <IconButton icon={<Icon icon="share-alt" />} size="sm" onClick={rx.onShare} />
                            </Whisper>
                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Print</Tooltip>}>
                                <IconButton icon={<Icon icon="print" />} size="sm" onClick={rx.onPrint} />
                            </Whisper>
                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Refresh</Tooltip>}>
                                <IconButton icon={<Icon icon="refresh" />} size="sm" onClick={rx.onRefresh} />
                            </Whisper></ButtonGroup>
                    </ButtonToolbar>
                </Col>
            </Row>
        </Grid>
    );
});