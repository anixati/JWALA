import { observer, useLocalStore } from "mobx-react";
import React, { ReactElement, ReactNode, useRef, useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { Content } from "rsuite";
import { KoButton } from "..";
import { HdrPanel, LeftSplitPanel, ViewPanel } from "../../layouts";
import { createWizard, IStepInfo, IStepObj, wzdContext } from "./context";
import { WzdHelp, WzdProgress, WzdSummary } from "./controls";

export interface WzdFormProps {
    title: string;
    values: any;
    onSubmit: (values: any) => void;
    completed: ReactNode;
}


export const WzForm: React.FC<WzdFormProps> = observer((rx) => {

    //-------------------------Initialise-------------------
    if (!rx.children) return null;
    const wzNodes = React.Children.toArray(rx.children).filter(s => React.isValidElement<IStepInfo>(s)) as ReactElement[];
    if (wzNodes === undefined) return null;
    const infos = wzNodes.map((itm, ix) => { return { ...itm.props } as IStepInfo })

    //-------------------------Build Steps-------------------
    const childRef = useRef<IStepObj>(null);
    const store = useLocalStore(createWizard);
    store.init(infos);
    const CurrentStep = () => React.cloneElement(wzNodes[store.index], { ref: childRef });

    //-------------------------Restart------------------------------
    const navigate = useNavigate();
    const onRestart = () => { navigate('/go'); navigate(-1); }
    //-------------------------State------------------------------
    const [snapshot, setSnapshot] = useState(rx.values);

    //-------------------------onComplete------------------------------
    const onComplete = () => {
        rx.onSubmit(snapshot);
        store.onComplete();

    }

    //-------------------------Nav events-----------------------------
    const goBack = () => {
        store.onPrev();
    }
    const onNext = async () => {
        if (!childRef.current) return;
        if (await childRef.current.canNext()) {
            store.onNext();
        } else {
            store.setError();
        }
    }
    //-------------------------Step Submit-----------------------------
    const handleSubmit = async (values: any, bag: { setTouched: (arg0: {}) => void; }) => {
        setSnapshot(rs => { return { ...rs, ...values }; });
        console.log('snapshot----->', snapshot);
        if (childRef.current) {
            await childRef.current.submit(values);
        }
        bag.setTouched({});
    };

    return (
        <wzdContext.Provider value={store}>
            <HdrPanel title={rx.title} className="jwizard">
                <WzdProgress status={store.hasError} />
                <Content >
                    <LeftSplitPanel leftNode={<WzdHelp />}>
                        <ViewPanel leftCmds={<>
                            <KoButton icn="arrow-left" appearance="primary" onClick={goBack} disabled={store.disablePrev} >Previous</KoButton>
                            {store.isCompleted && (<KoButton icn="undo" appearance="primary" onClick={onRestart} >Restart</KoButton>)}</>
                        } rightCmds={<>
                            <KoButton icn="check" color="orange" onClick={onComplete} disabled={!store.isSummary}>Submit</KoButton>
                            <KoButton icn="arrow-right" appearance="primary" onClick={onNext} disabled={store.disableNext}>Next</KoButton></>
                        } centerCmds={<p>{store.progessState}</p>} loading={false} >
                            <Formik initialValues={snapshot} onSubmit={handleSubmit} validationSchema={childRef.current?.schema}>
                                {frm => (
                                    <Form className="rs-form rs-form-vertical rs-form-fluid" noValidate>
                                        {store.isForms && (<CurrentStep />)}
                                        {store.isSummary && (
                                            <div className="jwzstep">
                                               <WzdSummary />
                                            </div>)}
                                        {store.isCompleted && (
                                            <div className="jwzstep">
                                                {rx.completed}
                                            </div>)}

                                    </Form>
                                )}
                            </Formik>
                        </ViewPanel>
                    </LeftSplitPanel>
                </Content>
            </HdrPanel>
        </wzdContext.Provider>
    );
});




