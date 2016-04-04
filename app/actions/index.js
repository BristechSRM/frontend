import { createAction } from 'redux-actions';
import Promise from 'bluebird';

import SessionsApi from '../services/SessionsApi';

export const REQUEST_SPEAKERS = 'REQUEST_SPEAKERS';
export const SESSION_VIEW_SETTINGS_CHANGED = 'SESSION_VIEW_SETTINGS_CHANGED';

export const requestSessions = createAction(REQUEST_SPEAKERS, SessionsApi.getSessions);

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
