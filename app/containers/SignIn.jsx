import React, { Component, PropTypes } from 'react';
import AuthService from '../services/AuthService.js';

class SignIn extends Component {

    componentWillMount() {
        if (AuthService.isAuthenticated()) {
            this.context.router.push('/dashboard');
            return;
        }

        AuthService.signIn();
    }

    render() {
        return (<div></div>);
    }
}

SignIn.contextTypes = {
    router: PropTypes.object,
};

export default SignIn;
