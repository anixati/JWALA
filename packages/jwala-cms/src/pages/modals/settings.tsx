import React, { useState } from "react";
import { MdlPanel } from "../../layouts/mdlPanel";

export const SettingsModal: React.FC = () => {
    const [loading, setLoading] = useState(false);
    return (
        <MdlPanel headingStr="Settings" loading={loading}>
            <h1>Settings </h1>
        </MdlPanel>
    );
};
