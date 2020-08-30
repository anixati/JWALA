
// export * from "./components/loaders"

import React from "react";
import { Loader } from "rsuite";

export const KoInitLoader: React.FC = () => {
    return (
        <div style={{ width: '100%', textAlign: 'center', paddingTop: '200', backgroundColor: 'cyan' }}>
            <Loader content="Initilaising..." vertical />
        </div>
    );
 };