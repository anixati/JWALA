import React, { forwardRef, ReactElement, Ref, useImperativeHandle, useRef, useState } from "react";
import { ControlLabel, Form, FormControl, FormGroup, HelpBlock, Button } from "rsuite";
import { Schema } from "schema-typed";
import { IStepInfo, IStepObj } from "./context";
import { observer } from "mobx-react";



export class TextField extends React.PureComponent {
    render() {
        const { name, message, label, accepter, error, ...props } = this.props;
        return (
            <FormGroup className={error ? 'has-error' : ''}>
                <ControlLabel>{label} </ControlLabel>
                <FormControl
                    name={name}
                    accepter={accepter}
                    errorMessage={error}
                    {...props}
                />
                <HelpBlock>{message}</HelpBlock>
            </FormGroup>
        );
    }
}


export interface IFormInfo extends IStepInfo {
    data: Schema,
    values: any
}
export const WzForm: React.FC<IFormInfo> = forwardRef((rx, ref: Ref<IStepObj>) => {
//export const WzForm =  observer(forwardRef((rx: IFormInfo, ref: Ref<IStepObj>) => {
    const frmRef =  useRef<Form>(null);
    useImperativeHandle(ref, () => ({
        canNext: () => {
            console.log('....')
            if (frmRef.current) {
                frmRef.current.checkForField('name', checkResult => {
                    console.log(checkResult);
                  });

                const result = frmRef.current.check(srx=>{
                    setformErrors(srx);
                });
                if (!result) {
                    console.log('=== validation status', result);
                }
                return result;
            }
            return true;
        },
        submit: () => {
            console.log('submitting..', formState);

            // frmRef.current!.dispatchEvent(new Event("submit"))
            return true;
        }, reset: () => {
            frmRef.current?.cleanErrors();
        }
    }));

    const onSubmit = async (isOk: boolean): Promise<void> => {
        if (isOk) {
            console.log('@@@submitting..');
        }
    }
    const [formState, setFormState] = useState({});
    const [formErrors, setformErrors] = useState({});
    return (
        <div className="jwzstep" style={{ backgroundColor: '#9DA9E4' }}>
            <Form fluid ref={frmRef} model={rx.data}
                // formDefaultValue={rx.values}
                 formValue={formState}
                 onSubmit={onSubmit}
                onChange={fv => { setFormState(fv) }}
                //onCheck={fe => { setformErrors(fe) }} 
                formError={formErrors}
                onError={fe => { 
                    console.log('errors', fe); 
                    
                    }}
                    >
                         <FormControl name="name" placeholder="name"  />
                         <hr/>
                <FormControl name="email" placeholder="Email" />

                <Button appearance="primary" type="submit">
              Submit
            </Button>
                {/* {rx.children} */}
            </Form>
        </div>
    )
});

// export const WzForm = forwardRef(<T extends {}>(rx: IFormInfo<T>, ref: Ref<IStepObj>) => {
//     if (!rx.children) return null;
//     const nodes = React.Children.toArray(rx.children).filter(s => React.isValidElement<IStepInfo>(s)) as ReactElement[];
//     if (!Array.isArray(nodes)) return null;
//     const formRef = useRef<HTMLFormElement>(null);
//     const { register, handleSubmit, trigger, errors } = useForm<T>();

//     const onNextData = data => {
//         console.log('-|-|-', JSON.stringify(data));
//     };
//     useImperativeHandle(ref, () => ({
//         canNext: async () => {
//             return await trigger();
//         },
//         submit: () => {
//             console.log('submitting..');
//             formRef.current!.dispatchEvent(new Event("submit"))
//             return true;
//         }, reset: () => {

//         }
//     }));
//     return <div className="jwzstep" style={{ backgroundColor: 'cyan' }}>
//         <form ref={formRef}  onSubmit={handleSubmit(onNextData)}>
//             {nodes.map((itm, ix) => {
//                 return itm.props.name
//                     ? createElement(itm.type, {
//                         ...{
//                             ...itm.props,
//                             register,
//                             key: itm.props.name
//                         }
//                     })
//                     : itm;
//             })}
//         </form>
//     </div>;
// });



// //------------fields
// interface IFieldProps extends Partial<Pick<UseFormMethods, "register" | "errors">> {
//     rules?: ValidationRules;
//     name: string;
// }

// export const WzInput: React.FC<IFieldProps> = ({ rules = {}, register, errors = {}, name, ...props }) => {
//     return (
//         <input name={name} ref={register} {...props} />
//     );
// }