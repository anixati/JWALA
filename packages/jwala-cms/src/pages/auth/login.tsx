import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonToolbar, ControlLabel, Form, FormControl, FormGroup, Notification, Schema } from "rsuite";
import { Fbs } from "../../core/fb/fbs";
import { ImgPanel } from "../../layouts/imgPanel";

interface ILogin{ name:string,password:string}

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [state, setState] = useState<ILogin>({} as ILogin);
    const [loading, setLoading] = useState(false);
    const { StringType } = Schema.Types;
    const model = Schema.Model({
        name: StringType()
            .isEmail('Please enter a valid email address.')
            .isRequired('This field is required.'),
        password: StringType().isRequired('This field is required.')
    });
    const onSubmit = async (fm: boolean): Promise<void> => {
        if (fm) {
            setLoading(true);
            try {
                const rs = await Fbs.ctx.Auth.signIn(state.name, state.password);
                Notification.open({
                    title: 'Login Sucessfull!',
                    description: <div>
                        <p>Sucessfully logged in as {rs.user?.displayName}</p>
                    </div>
                });
                navigate("/");
            }
            catch (error) {
                Notification.error({ title: 'Login Failed', description: `${error.message}` });
            }
            finally {
                setLoading(false);
            }
        }
    };
    return (
        <ImgPanel header={<h3>Login</h3>} loading={loading}>
            <Form fluid model={model} onChange={fv => setState(fv as ILogin)} onSubmit={onSubmit}>
                <FormGroup>
                    <ControlLabel>Username or email address</ControlLabel>
                    <FormControl name="name" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl name="password" type="password" />
                </FormGroup>
                <FormGroup>
                    <ButtonToolbar>
                        <Button appearance="primary" type="submit">Sign in</Button>
                        <Button appearance="link" onClick={() => navigate('/login/reset')}>Forgot password?</Button>
                    </ButtonToolbar>
                </FormGroup>
            </Form>
        </ImgPanel >
    );
}
