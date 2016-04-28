import React from 'react';
import { Route } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';

// Route components
import App from './containers/App.jsx';
import AuthService from './services/AuthService.js';
import Dashboard from './containers/Dashboard.jsx';
import Session from './containers/Session.jsx';
import Calendar from './containers/Calendar.jsx';
import EventSessions from './containers/EventSessions.jsx';

const userIsAuthenticated = UserAuthWrapper({
    authSelector: () => (AuthService.isAuthenticated() ? { isAuthenticated: true } : null),
    wrapperDisplayName: 'UserIsAuthenticated',
    allowRedirectBack: false,
    failureRedirectPath: '/sign-in',
});

const appRoutes = (
  <Route component={App}>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/sessions/:sessionId" component={Session} />
      <Route path="/calendar" component={Calendar}>
        <Route path=":eventId" component={EventSessions} />
      </Route>
  </Route>
);

export default appRoutes;
