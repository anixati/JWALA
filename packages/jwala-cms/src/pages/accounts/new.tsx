import { observer } from "mobx-react";
import React from "react";
import { WzForm, WzStep, WfdText, KoText, KoNote, KoNumber } from "../../components";
import * as yo from 'yup';
import { Field, ErrorMessage } from "formik";
import { FormGroup, ControlLabel, Input } from "rsuite";

export interface INewAccount {
    name: string;
    level: number;
    desc: string;
    email: string;
    phone: string;
}



export const NewEntity: React.FC = observer(() => {
    const initial: INewAccount = { name: '', level: 1, desc: '', email: '', phone: '' };
    const onSubmit = (vals) => {
        console.log(vals);
    }

    return (
        <WzForm values={initial} title="New Account" onSubmit={onSubmit} completed={<div>status</div>}>
            <WzStep id={1} title="General" schema={yo.object({
                name: yo.string().required("required"),
                level: yo.number().required("required"),
                desc: yo.string().required("required")
            })} >

                <KoText name="name" placeholder="Name" label="Name"  help="help test"/>
                <KoNumber name="level" placeholder="Level" label="Name"  help="help test"/>
                <KoNote name="desc" placeholder="Description" label="Description"  help="help test"/>



            </WzStep>
            <WzStep id={2} title="Contact" schema={yo.object({
                email: yo.string().required("required"),
                phone: yo.number().required("required")
            })}>

                <div className="rs-form-group">
                    <label className="rs-control-label">email</label>
                    <Field name="email" type="text" />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </div>
                <div className="rs-form-group">
                    <label className="rs-control-label">phone</label>
                    <Field name="phone" type="text" />
                    <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                </div>

            </WzStep>

        </WzForm>
    )
})