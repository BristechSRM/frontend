import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
// import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import immutable from 'immutable';

import App from './containers/App.jsx';
import Speakers from './containers/Speakers.jsx';

const store = configureStore();


  //<Router history={browserHistory}>
    //<Route path="/" component={App}>
      //<IndexRoute component={Speakers} />
    //</Route>
  //</Router>

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
