import React, { Ref, forwardRef, useImperativeHandle } from "react";
import { useFormikContext } from 'formik';
import { IStepInfo, IStepObj } from "./context";

export interface IStepData extends IStepInfo {
    schema: any;
}
export const WzStep: React.FC<IStepData> = forwardRef((rx, ref: Ref<IStepObj>) => {
    const { submitForm, validateForm } = useFormikContext();
    useImperativeHandle(ref, () => ({
        canNext: async () => {
            const errors = await validateForm();
            if (Object.keys(errors).length === 0 && errors.constructor === Object) {
                submitForm();
                return true;
            } else {
                return false;
            }
        },
        submit: async (values) => {
            await new Promise(resolve => setTimeout(resolve, 100));
            return null;
        },
        reset: () => {

        },
        schema: () => {
            return rx.schema;
        }
    }));

    return (
        <div className="jwzstep" style={{ padding:'10px'}}>
            {rx.children}
        </div>
    )
});