import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';

import App from './containers/App.jsx';
import AuthCallback from './containers/AuthCallback.jsx';
import Dashboard from './containers/Dashboard.jsx';
import Session from './containers/Session.jsx';
import Calendar from './containers/Calendar.jsx';
import AuthService from './services/AuthService.js';

AuthService.isAuthenticated();

import injectTouchTapEvent from 'react-tap-event-plugin';
injectTouchTapEvent();

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: state => (state.get('routing')
        ? state.get('routing').toJS()
        : state),
});

const userIsAuthenticated = UserAuthWrapper({
    authSelector: () => ({ authenticated: true }),
    wrapperDisplayName: 'UserIsAuthenticated',
    allowRedirectBack: false,
    redirectAction: () => {
        window.location = 'http://api.bris.tech:9003';
    },
});

render(
    <Provider store={store}>
    <Router history={history}>
        <Route component={AuthCallback} />
        <Route component={App}>
            <Route path="/dashboard" component={userIsAuthenticated(Dashboard)} />
            <Route path="/sessions/:sessionId" component={Session} />
            <Route path="/calendar" component={Calendar} />
        </Route>
        <Redirect from="*" to="/dashboard" />
    </Router>
</Provider>, document.getElementById('root'));
