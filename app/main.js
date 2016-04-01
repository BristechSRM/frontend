import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import immutable from 'immutable';
import { syncHistoryWithStore } from 'react-router-redux'

import App from './containers/App.jsx';
import Speakers from './containers/Speakers.jsx';
import Session from './containers/Session.jsx';

const store = configureStore(immutable.Map());

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.get('routing') ? state.get('routing').toJS() : state
});

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Speakers} />
        <Route path="/session/:sessionId" component={Session} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
