import React from "react";
import { IconButtonProps, IconButton, Icon } from "rsuite";
import { Loader } from "rsuite";



export const LoadView: React.FC = () => {
    return (
        <div style={{ width: '100%', textAlign: 'center',paddingTop:'150' }}>
            <Loader content="Initilaising..." vertical />
        </div>
    );
};


export interface ImageButtonProps extends IconButtonProps {
    icn: any;
    onRight?: boolean;
}
export const KoButton: React.FC<ImageButtonProps> = (rx) => {
    const alignment = rx.onRight ? "right" : "left";
    return (<IconButton size="sm" icon={<Icon icon={rx.icn} />} placement={alignment} {...rx}>
        {rx.children}
    </IconButton>)
}