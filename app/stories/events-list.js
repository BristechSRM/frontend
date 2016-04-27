import 'babel-polyfill';
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import EventList from '../components/Calendar/EventList.jsx';
import immutable from 'immutable';
import { getStubEvents } from '../stub/events.js';

const events = immutable.List(getStubEvents(8));

storiesOf('EventList', module)
  .add('with events', () => (
    <EventList events={events} onEventSelected={action('event selected')} />
  ));
