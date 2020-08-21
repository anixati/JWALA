import React, { useState } from "react";
import { MdlPanel } from "../../layouts/mdlPanel";
//---------Pages ------------------------

export const ProfileModal: React.FC = () => {
    const [loading, setLoading] = useState(false);
    return (
        <MdlPanel headingStr="My Profile" loading={loading}>
            <h1>profile </h1>
        </MdlPanel>
    );
};
