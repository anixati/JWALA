import React from "react";
import { Container } from "rsuite";

export const HdrPanel: React.FC<{ title: string, className?: string }> = (rx) => {
    return (
        <div className="jhdr-panel">
            <div className="jhdr-title">
                <h6>{rx.title}</h6>
            </div>
            <Container className={rx.className ? rx.className : ""}>
                {rx.children}
            </Container>
        </div>
    );
};
