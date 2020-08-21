import { observer } from "mobx-react";
import React from "react";
import { Icon, InputGroup, InputNumber } from "rsuite";
import { WzdPanel, WzdStep } from "../../components";


export const NewEntity: React.FC = observer(() => {
   // const { accStore } = useStore();
    // const onSearch = (e) => {
    // }
    // const onNew = () => {
    // }
    return (
        <WzdPanel title="New Account">
            <WzdStep id="1" title="step 1" desc="some ewjf;ewjf">
                <div>
                <InputNumber />
                    <InputGroup >
                        {/* <Input name="srd"  onChange={(e,v)=>{ }} placeholder="Search..." size="md"/> */}
                        <InputGroup.Addon>
                            <Icon icon="search" />
                        </InputGroup.Addon>
                    </InputGroup>
                </div>


            </WzdStep>
            <WzdStep id="2" title="step 2" desc="some ewjf;ewjf">
                <p>fdgdfgdfg</p>
            </WzdStep>
            <WzdStep id="3" title="step 3" desc="some ewjf;ewjf">
                <p>fdgdfgfd</p>
            </WzdStep>

            <WzdStep id="4" title="step 3" desc="some ewjf;ewjf">
                <p>dfdf</p>
            </WzdStep>
        </WzdPanel>
    )
})