import React, { useState } from "react";
import { Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button, Schema, Notification } from "rsuite";
import { useNavigate } from "react-router-dom";
import { ImgPanel } from "../../layouts/imgPanel";
import { Fbs } from "../../core/fb/fbs";


interface IReset { name: string }
export const ResetPage: React.FC = () => {
    let navigate = useNavigate();
    const [state, setState] = useState<IReset>({} as IReset);
    const [loading, setLoading] = useState(false);
    const { StringType } = Schema.Types;
    const model = Schema.Model({
        name: StringType()
            .isEmail('Please enter a valid email address.')
            .isRequired('This field is required.')
    });
    const onSubmit = async (fm: boolean): Promise<void> => {
        if (fm) {
            setLoading(true);
            try {
                await Fbs.ctx.Auth.resetPwd(state.name);
                Notification.open({
                    title: 'Password link sent to email',
                    description: <div>
                        <p>please check your email</p>
                        <ButtonToolbar>
                            <Button onClick={() => { Notification.close(); navigate("/login"); } }>Ok</Button>
                        </ButtonToolbar>
                    </div>
                });
            }
            catch (error) {
                Notification.error({ title: 'Password Reset Failed', description: `${error.message}` });
            }
            finally {
                setLoading(false);
            }
        }
    };
    return (
        <ImgPanel header={<h3>Reset Password</h3>} loading={loading}>
            <Form fluid model={model} onChange={fv => setState(fv as IReset)}
                onSubmit={onSubmit}>
                <FormGroup>
                    <ControlLabel>Username or email address</ControlLabel>
                    <FormControl name="name" />
                </FormGroup>
                <FormGroup>
                    <ButtonToolbar>
                        <Button appearance="primary" type="submit">Reset Password</Button>
                        <Button appearance="link" onClick={() => navigate('/login')}>Cancel</Button>
                    </ButtonToolbar>
                </FormGroup>
            </Form>
        </ImgPanel>
    );
};
