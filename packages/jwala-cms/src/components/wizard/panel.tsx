import { observer, useLocalStore } from "mobx-react";
import React, { useEffect } from "react";
import { Content } from "rsuite";
import { KoButton, wzdStepProps } from "..";
import { HdrPanel, LeftSplitPanel, ViewPanel } from "../../layouts";
import { createWizard, wzdContext, IStepInfo } from "./context";
import { WzdProgress } from "./progress";


export interface WzdPanelProps {
    title: string;
}

export const WzdPanel: React.FC<WzdPanelProps> = observer((rx) => {
    if (!rx.children) return null;
   // const nodes = React.Children.toArray(rx.children).filter(x=>React.isValidElement<wzdStepProps>(x));
    const steps = React.Children.map(rx.children, (child: React.ReactElement<wzdStepProps>) => {return { ...child.props } as IStepInfo});
    const store = useLocalStore(createWizard);
    store.init(steps);

    const onNext = () => { store.onNext() }
    const onPrev = () => { store.onPrev() }
    const onSave = () => { }
    const onComplete = () => { store.onComplete() }

      // useEffect(() => {
    //     store.init(steps);
    // }, []);

   // const activeStep = nodes[store.index];

    return (
        <HdrPanel title={rx.title} className="jwizard">
            <wzdContext.Provider value={store}>
                <WzdProgress />
                <Content >
                    <LeftSplitPanel leftNode={
                        <ViewPanel leftCmds={<p>Help</p>} loading={false}>
                        </ViewPanel>
                    }>
                        <ViewPanel leftCmds={<>
                            <KoButton icn="arrow-left" appearance="primary" onClick={onPrev} disabled={store.disablePrev} >Previous</KoButton>
                            <KoButton icn="save" onClick={onSave} disabled={store.disableSave}>Save</KoButton>
                        </>} rightCmds={<>
                            <KoButton icn="check-square" onClick={onComplete} disabled={store.disableComplete}>Complete</KoButton>
                            <KoButton icn="arrow-right" appearance="primary" onClick={onNext} disabled={store.disableNext}>Next</KoButton>
                        </>} centerCmds={<p>{store.progessState}</p>} loading={false} >
                            {rx.children}
                        </ViewPanel>
                    </LeftSplitPanel>
                </Content>
            </wzdContext.Provider>
        </HdrPanel>
    );
});




