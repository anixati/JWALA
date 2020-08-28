import { observer, useLocalStore } from "mobx-react";
import React, { ReactNode, ReactChild, ReactElement, useRef, forwardRef, Ref, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "rsuite";
import { KoButton } from "..";
import { HdrPanel, LeftSplitPanel, ViewPanel } from "../../layouts";
import { createWizard, IStepInfo, wzdContext, IStepObj } from "./context";
import { WzdHelp, WzdProgress } from "./progress";

export interface WzdPanelProps {
    title: string;
    summary: ReactNode;
    completed: ReactNode;
}


export const WzdPanel: React.FC<WzdPanelProps> = observer((rx) => {
    if (!rx.children) return null;
    const wzNodes = React.Children.toArray(rx.children).filter(s => React.isValidElement<IStepInfo>(s)) as ReactElement[];
    if (wzNodes === undefined) return null;
    const infos = wzNodes.map((itm, ix) => { return { ...itm.props } as IStepInfo })
    const childRef = useRef<IStepObj>(null);
    const navigate = useNavigate();
    const store = useLocalStore(createWizard);
    store.init(infos);
    const onNext = () => {
        console.log('....')
        if (childRef.current){
            childRef.current.canNext();
            if (childRef.current.canNext()) {
                
                console.log('....')
                if (childRef.current.submit())
                    store.onNext();
            } else {
                store.setError();
            }
        }
    }
    const onPrev = () => { store.onPrev() }
    const onSave = () => { navigate('/go'); navigate(-1); }
    const onComplete = () => { store.onComplete() }
    const CurrentStep = () => {
        const step = wzNodes[store.index];
        return React.cloneElement(step, { ref: childRef });
    }

    return (
        <wzdContext.Provider value={store}>
            <HdrPanel title={rx.title} className="jwizard">
                <WzdProgress status={store.hasError} />
                <Content >
                    <LeftSplitPanel leftNode={<WzdHelp />}>
                        <ViewPanel leftCmds={<>
                            <KoButton icn="arrow-left" appearance="primary" onClick={onPrev} disabled={store.disablePrev} >Previous</KoButton>
                            {store.isCompleted && (<KoButton icn="undo" appearance="primary" onClick={onSave} >Restart</KoButton>)}</>
                        } rightCmds={<>
                            <KoButton icn="check" color="orange" onClick={onComplete} disabled={!store.isSummary}>Submit</KoButton>
                            <KoButton icn="arrow-right" appearance="primary" onClick={onNext} disabled={store.disableNext}>Next</KoButton></>
                        } centerCmds={<p>{store.progessState}</p>} loading={false} >
                            {store.isForms && (<CurrentStep />)}
                            {store.isSummary && (<div className="jwzstep">{rx.summary}</div>)}
                            {store.isCompleted && (<div className="jwzstep">{rx.completed}</div>)}
                        </ViewPanel>
                    </LeftSplitPanel>
                </Content>
            </HdrPanel>
        </wzdContext.Provider>
    );
});




