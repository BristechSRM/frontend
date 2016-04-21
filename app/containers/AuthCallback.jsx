import React, { Component, PropTypes } from 'react';
import authService from '../services/AuthService.js';

class AuthCallback extends Component {

    componentWillMount() {
        authService.processTokenAsync().then(() => {
            this.context.router.push('/dashboard');
        }, error => {
            console.log(`There was an error processing the token ${error}`);
            this.context.router.push('/dashboard');
        });
    }

    render() {
        return (<div></div>);
    }
}

AuthCallback.contextTypes = {
    router: PropTypes.object,
};

export default AuthCallback;
