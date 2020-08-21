import React, { createContext } from "react";


//--------------- Modal Context  -----------------------
export interface MdlProps {
    show: boolean;
    onClose: () => void;
}
export const mdlContext = createContext<MdlProps>({} as MdlProps);