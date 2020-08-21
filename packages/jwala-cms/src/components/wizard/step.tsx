import React from "react";
import { IStepInfo, useWzd } from "./context";
import { observer } from "mobx-react";

export const WzdStep: React.FC<IStepInfo> = observer((rx) => {
    const wzd = useWzd();
    return wzd.isActive(rx.id) ? <div className="jwzstep">{rx.children}</div> : null;
});