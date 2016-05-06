import 'babel-polyfill';
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import SessionList from '../components/Dashboard/SessionList/SessionList.jsx';
import { getStubSessions } from '../stub/sessions.js';

const sessions = getStubSessions(20);

storiesOf('SessionList', module)
  .add('with sessions', () => (
      <SessionList sessions={sessions} onSessionSelected={action('session selected')} />
  ));
