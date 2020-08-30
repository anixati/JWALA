import { Field, useField } from "formik";
import React from "react";
import { ControlLabel, FormGroup, HelpBlock, Input, InputProps, InputNumber } from "rsuite";
import * as cx from "classnames";

const setBorder = (meta) => {
    if (meta.error) return "jfld-error";
    if (meta.touched) return "jfld-touched";
    return ""
}
export interface IKoField {
    name: string;
    label: string;
    placeholder: string;
    help?: string;
}
const KoField: React.FC<IKoField> = (rx) => {
    const [field, meta] = useField({ name: rx.name });
    const cssName = cx("rs-form-control-wrapper", setBorder(meta));
    return (
        <FormGroup>
            <ControlLabel>{rx.label}</ControlLabel>
            <div className={cssName}>
                {rx.children}
            </div>
            {meta.error && (<div className="jflderror">
                <p className="jflderrotxt">{meta.error}</p>
            </div>
            )}
            {rx.help && (<HelpBlock>{rx.help}</HelpBlock>)}
        </FormGroup>
    )
}

export interface KoTextProps extends IKoField, InputProps {
}
export const KoText: React.FC<KoTextProps> = (rx) => {
    const [field, meta] = useField({ name: rx.name });
    return (
        <KoField {...rx}>
            <Input {...field} onChange={(v, e) => field.onChange(e)} placeholder={rx.placeholder}/>
        </KoField>
    );
};
export const KoNumber: React.FC<KoTextProps> = (rx) => {
    const [field, meta] = useField({ name: rx.name });
    return (
        <KoField {...rx}>
            <InputNumber {...field} onChange={(v, e) => field.onChange(e)} placeholder={rx.placeholder}/>
        </KoField>
    );
};
export const KoNote: React.FC<KoTextProps> = (rx) => {
    const [field, meta] = useField({ name: rx.name });
    return (
        <KoField {...rx}>
            <Input {...field} onChange={(v, e) => field.onChange(e)} rows={3} style={{ resize: 'auto' }}
                componentClass="textarea" placeholder={rx.placeholder}
            />
        </KoField>
    );
};
