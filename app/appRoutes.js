import React from 'react';
import { Route } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';

// Route components
import App from './containers/App.jsx';
import Dashboard from './containers/Dashboard.jsx';
import Session from './containers/Session.jsx';
import NewSession from './containers/NewSession.jsx';
import NewSpeaker from './containers/NewSpeaker.jsx';
import NewEvent from './containers/NewEvent.jsx';
import Calendar from './containers/Calendar.jsx';
import EventSessions from './containers/EventSessions.jsx';
import AuthService from './services/AuthService.js';

const UserIsAuthenticated = UserAuthWrapper({
    authSelector: () => ({ isAuthenticated: AuthService.isAuthenticated() }),
    wrapperDisplayName: 'UserIsAuthenticated',
    allowRedirectBack: false,
    failureRedirectPath: '/sign-in',
    predicate: state => state.isAuthenticated,
});

const appRoutes = (
  <Route component={UserIsAuthenticated(App)}>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/sessions/new" component={NewSession} />
      <Route path="/sessions/:sessionId" component={Session} />
      <Route path="/speakers/new" component={NewSpeaker} />
      <Route path="/events/new" component={NewEvent} />
      <Route path="/calendar" component={Calendar}>
        <Route path=":eventId" component={EventSessions} />
      </Route>
  </Route>
);

export default appRoutes;
