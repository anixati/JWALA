import { observer } from "mobx-react";
import React from "react";
import { WzdPanel, WzForm, WzText, TextField } from "../../components";
import { Schema, ButtonToolbar, Button, FormGroup, FormControl } from "rsuite";

export interface IAccVal {
    name: string;
    email: string;

}



export const NewEntity: React.FC = observer(() => {
    const { StringType } = Schema.Types;
    const model = Schema.Model({
        name: StringType().isRequired('This field is required.'),
        email: StringType()
            .isEmail('Please enter a valid email address.')
            .isRequired('This field is required.')
    });
    const defaultVals: IAccVal = {
        name: "",
        email: "pb@gg.com"
    };

    return (
        <WzdPanel title="New Account" summary={<div>summary</div>} completed={<div>status</div>}>
            <WzForm id={1} title="Extra details" data={model} values={defaultVals}>
                {/* <TextField name="name" label="Account Name" />
                <TextField name="email" label="Email" /> */}

               

            </WzForm>
            <WzForm id={2} title="fff details" data={model} values={defaultVals}>
                {/* <TextField name="name" label="Account Name" />
                <TextField name="email" label="Email" /> */}

                <FormControl name="name" placeholder="name"/>
                <FormControl name="email" placeholder="Email" />

            </WzForm>
        </WzdPanel>
    )
})