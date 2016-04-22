import React, { Component, PropTypes } from 'react';
import authService from '../services/AuthService.js';

class SignedIn extends Component {

    componentWillMount() {
        authService.processTokenAsync().then(() => {
            this.context.router.push('/dashboard');
        }, () => {
            // console.log(`There was an error processing the token ${error}`);
            this.context.router.push('/dashboard');
        });
    }

    render() {
        return (<div></div>);
    }
}

SignedIn.contextTypes = {
    router: PropTypes.object,
};

export default SignedIn;
