import React, { Component } from 'react';
import authService from '../services/AuthService.js';

class AuthCallback extends Component {

    componentWillMount() {
        authService.processTokenAsync().then(() => {
            console.log('token processed correctly');
        }, error => {
            console.log(`There was an error processing the token ${error}`);
        });
    }

    render() {
        return (<div></div>);
    }
}

export default AuthCallback;
