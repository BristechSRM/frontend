import { createAction } from 'redux-actions';
import Promise from 'bluebird';

import SessionsApi from '../services/SessionsApi';

export const REQUEST_SPEAKERS = 'REQUEST_SPEAKERS';
export const SPEAKER_FILTER_CHANGED = 'SPEAKER_FILTER_CHANGED';

export const requestSessions = createAction(REQUEST_SPEAKERS, SessionsApi.getSessions);

export const sessionFilterChanged = createAction(SPEAKER_FILTER_CHANGED, filters => {
  return new Promise((resolve, reject) => {
      SessionsApi.getSessions(filters).then(sessions => {
        resolve({
          filters: filters,
          sessions: sessions
        });
      }).catch(error => reject(error));
  });
});
