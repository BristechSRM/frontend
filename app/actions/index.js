import { createAction } from 'redux-actions';

import SessionsApi from '../services/SessionsApi';

export const UPDATE_SPEAKERS_START = 'UPDATE_SPEAKERS_START';
export const UPDATE_SPEAKERS_COMPLETE = 'UPDATE_SPEAKERS_COMPLETE';
export const UPDATE_SPEAKERS_ERROR = 'UPDATE_SPEAKERS_ERROR';
export const REQUEST_SPEAKERS = 'REQUEST_SPEAKERS';
export const SESSION_VIEW_SETTINGS_CHANGED = 'SESSION_VIEW_SETTINGS_CHANGED';

export const requestSessions = (filters, sortProperty, isSortOrderAscending)  => {
  return dispatch => {
    dispatch(createAction(UPDATE_SPEAKERS_START)());
    return SessionsApi.getSessions(
        filters,
        sortProperty,
        isSortOrderAscending).then(
      sessions => dispatch(createAction(UPDATE_SPEAKERS_COMPLETE)({
        filters,
        sortProperty,
        isSortOrderAscending,
        sessions
      })),
      error => dispatch(createAction(UPDATE_SPEAKERS_ERROR)(error))
    );
  };
};

export const sessionViewSettingsChanged = createAction(SESSION_VIEW_SETTINGS_CHANGED, viewSettings => {
    return new Promise((resolve, reject) => {
        SessionsApi.getSessions(viewSettings.get('filters'), viewSettings.get('sortProperty'), viewSettings.get('isSortOrderAscending'))
        .then(sessions => {
            resolve({
                viewSettings: viewSettings,
                sessions: sessions
            });
        }).catch(error => reject(error));
    });
});
