import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import immutable from 'immutable';
import { syncHistoryWithStore } from 'react-router-redux'

import App from './containers/App.jsx';
import Dashboard from './containers/Dashboard.jsx';
import Session from './containers/Session.jsx';

import injectTouchTapEvent from 'react-tap-event-plugin';
injectTouchTapEvent();

const store = configureStore(immutable.Map());

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.get('routing') ? state.get('routing').toJS() : state
});

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
        <Route path="/session/:sessionId" component={Session} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
