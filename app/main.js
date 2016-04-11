import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './containers/App.jsx';
import Dashboard from './containers/Dashboard.jsx';
import Session from './containers/Session.jsx';

import injectTouchTapEvent from 'react-tap-event-plugin';
injectTouchTapEvent();

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: state => (state.get('routing') ? state.get('routing').toJS() : state),
});

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
      </Route>
      <Route path="sessions" component={App}>
        <Route path=":sessionId" component={Session} />
      </Route>
      <Redirect from="*" to="/" />
    </Router>
  </Provider>,
  document.getElementById('root')
);
