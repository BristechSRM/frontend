import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Route components
import SignIn from './containers/SignIn.jsx';
import SignedIn from './containers/SignedIn.jsx';
import appRoutes from './appRoutes.js';

import injectTouchTapEvent from 'react-tap-event-plugin';
injectTouchTapEvent();

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/signed-in" component={SignedIn} />
        {appRoutes}
        <Redirect from="*" to="/dashboard" />
      </Router>
    </Provider>,
document.getElementById('root'));
