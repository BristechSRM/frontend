import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import EventList from '../components/Event/EventList.jsx';
import immutable from 'immutable';

const events = [{
    id: 'df191161-7cf3-4230-9b19-d92bcb0dfe0c',
    date: Date.now(),
    status: 'unassigned',
    sessions: [
        'df191161-7cf3-4230-9b19-d92bcb0dfe0c',
    ],
}, {
    id: '88dadaf1-d5f3-4d5d-b7e7-4bcff980128e',
    date: Date.now(),
    status: 'assigned',
    sessions: [
        'df191161-7cf3-4230-9b19-d92bcb0dfe0c',
        '88dadaf1-d5f3-4d5d-b7e7-4bcff980128e',
    ],
}];

storiesOf('EventList', module)
  .add('with events', () => (
    <EventList events={immutable.List(events)} onEventSelected={action('event selected')} />
  ));
