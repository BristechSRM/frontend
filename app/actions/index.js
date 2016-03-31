import { createAction } from 'redux-actions';
import Promise from 'bluebird';

import SpeakersApi from '../services/SpeakersApi';

export const REQUEST_SPEAKERS = 'REQUEST_SPEAKERS';
export const SPEAKER_FILTER_CHANGED = 'SPEAKER_FILTER_CHANGED';

export const requestSpeakers = createAction(REQUEST_SPEAKERS, SpeakersApi.getSpeakers);

export const speakerFilterChanged = createAction(SPEAKER_FILTER_CHANGED, filters => {
  return new Promise((resolve, reject) => {
      SpeakersApi.getSpeakers(filters).then(speakers => {
        resolve({
          filters: filters,
          speakers: speakers
        });
      }).catch(error => reject(error));
  });
});
