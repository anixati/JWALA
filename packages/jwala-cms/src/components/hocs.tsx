import React from "react";
import { IconButtonProps, IconButton, Icon } from "rsuite";

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