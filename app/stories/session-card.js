import 'babel-polyfill';
import React from 'react';
import moment from 'moment';
import { storiesOf, action } from '@kadira/storybook';
import SessionCard from '../components/Dashboard/SessionList/SessionCard.jsx';

storiesOf('SessionCard', module)
  .add('contacted (in)', () => (
      <SessionCard
        id="1"
        onSelect={action('session selected')}
        width="300px"
        height="300px"
        title="An introduction to the best parts of Clojure."
        status="date-assigned"
        date={Date.now()}
        speakerForename="Rachel"
        speakerSurname="Adams"
        speakerRating={4}
        adminForename="Chris"
        adminSurname="Smith"
        adminImageUri="https://placebear.com/g/50/50"
      />
  ))
  .add('contacted (out)', () => (
      <SessionCard
        id="1"
        onSelect={action('session selected')}
        width="300px"
        height="300px"
        title="An introduction to the best parts of Clojure."
        status="date-assigned"
        date={Date.now()}
        speakerForename="Rachel"
        speakerSurname="Adams"
        speakerRating={4}
        adminForename="Chris"
        adminSurname="Smith"
        adminImageUri="https://placebear.com/g/50/50"
      />
  ))
  .add('not contacted', () => (
      <SessionCard
        id="1"
        onSelect={action('session selected')}
        width="300px"
        height="300px"
        title="An introduction to the best parts of Clojure."
        status="date-assigned"
        date={Date.now()}
        speakerForename="Rachel"
        speakerSurname="Adams"
        speakerRating={4}
        adminForename="Chris"
        adminSurname="Smith"
        adminImageUri="https://placebear.com/g/50/50"
      />
  ))
  .add('no title', () => (
    <SessionCard
      id="1"
      onSelect={action('session selected')}
      width="300px"
      height="300px"
      title={null}
      status="date-assigned"
      date={Date.now()}
      speakerForename="Rachel"
      speakerSurname="Adams"
      speakerRating={4}
      adminForename="Chris"
      adminSurname="Smith"
      adminImageUri="https://placebear.com/g/50/50"
    />
  ));
