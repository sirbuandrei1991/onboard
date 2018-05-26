import React from 'react';
import { AutoForm, AutoField } from 'uniforms-unstyled';
import SimpleSchema from 'simpl-schema';
import { Link } from 'react-router-dom';

import '/client/style.css';

export default class Home extends React.Component {
    constructor() {
        super();
    }
    render() {
        const {history} = this.props;
        return (
            <div className="container">
                <div>
                    <p className="homepage_title">Welcome to my blog!</p>
                </div>
                <div>
                    <p className="homepage-links">
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        );
      }
}

const schema = new SimpleSchema({
    myValue: String
});
