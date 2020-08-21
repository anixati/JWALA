import React, { useContext } from "react";
import { Modal, Button, ButtonToolbar, Icon } from "rsuite";
import LoadingOverlay from 'react-loading-overlay';
import { mdlContext } from "../core";

//---------Modal Panel Layout ------------------------
export interface MdlPanelProps {
    headingStr: string;
    loading: boolean;
    loadingStr?: string;
    btnStr?: string;
    backgnd?: boolean;
}
export const MdlPanel: React.FC<MdlPanelProps> = (rx) => {
    const context = useContext(mdlContext);
    const onClose = () => {
        context.onClose();
    };
    return (
        <Modal show={context.show} onHide={onClose} backdrop={rx.backgnd?rx.backgnd:false}>
            <Modal.Header>
                <Modal.Title>{rx.headingStr}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LoadingOverlay active={rx.loading} spinner text={rx.loadingStr ? rx.loadingStr : "loading ..."}>
                    {rx.children}
                </LoadingOverlay>
            </Modal.Body>
            <Modal.Footer>
                <ButtonToolbar>
                    <Button color="blue">
                        <Icon icon="check-circle" /> {rx.btnStr ? rx.btnStr : "Save"}
                    </Button>
                    <Button color="red" onClick={onClose}>
                        <Icon icon="ban" /> Cancel
                    </Button>
                </ButtonToolbar>
            </Modal.Footer>
        </Modal>
    );
};
