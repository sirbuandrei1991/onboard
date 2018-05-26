import React from 'react';
import {AutoForm, AutoField, ErrorsField} from 'uniforms-unstyled';
import SimpleSchema from 'simpl-schema';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    handleLogin = (data) => {
        const {email, password} = data;
        Meteor.loginWithPassword(email, password, (err) => {
            if (!err) {
                return this.props.history.push('/posts');
            }
            alert(err.reason);
        });
    };

    render() {
        return (
            <div className="container">
                <div className="authentication">
                    <AutoForm onSubmit={this.handleLogin} schema={LoginSchema}>
                        <ErrorsField/>

                        <AutoField name="email"
                                placeholder="Email"/>

                        <AutoField name="password" type="password" placeholder="Password"/>

                        <button type="submit">Login</button>
                    </AutoForm>
                </div>
            </div>
        )
    }
}

const LoginSchema = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    password: {type: String}
});
