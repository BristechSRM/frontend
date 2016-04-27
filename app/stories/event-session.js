import 'babel-polyfill';
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import EventSession from '../components/Calendar/EventSession.jsx';
import { getStubEventSessions } from '../stub/events.js';

const eventSession = getStubEventSessions()[0].sessions[0];

storiesOf('EventSession', module)
  .add('with session', () => (
    <EventSession
      key={eventSession.id}
      date={eventSession.date}
      title={eventSession.title}
      speakerForename={eventSession.speakerForename}
      speakerSurname={eventSession.speakerSurname}
      speakerImageUri={eventSession.speakerImageUri}
    />
  ));
