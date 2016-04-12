import {
    createAction,
} from 'redux-actions';
import SessionsApi from '../services/SessionsApi';
import CommsApi from '../services/CommsApi';
import ProfilesService from '../services/ProfilesService';
import immutable from 'immutable';

export const UPDATE_SESSIONS_START = 'UPDATE_SESSIONS_START';
export const UPDATE_SESSIONS_COMPLETE = 'UPDATE_SESSIONS_COMPLETE';
export const UPDATE_SESSIONS_ERROR = 'UPDATE_SESSIONS_ERROR';

export const UPDATE_LAST_CONTACT_START = 'UPDATE_LAST_CONTACT_START';
export const UPDATE_LAST_CONTACT_COMPLETE = 'UPDATE_LAST_CONTACT_COMPLETE';
export const UPDATE_LAST_CONTACT_ERROR = 'UPDATE_LAST_CONTACT_ERROR';

export const GET_SESSION_START = 'GET_SESSION_START';
export const GET_SESSION_COMPLETE = 'GET_SESSION_COMPLETE';
export const GET_SESSION_ERROR = 'GET_SESSION_ERROR';

export const GET_PROFILES_START = 'GET_PROFILES_START';
export const GET_PROFILES_COMPLETE = 'GET_PROFILES_COMPLETE';
export const GET_PROFILES_ERROR = 'GET_PROFILES_ERROR';

export const VIEW_SETTINGS_CHANGED = 'VIEW_SETTINGS_CHANGED';

export const getAllSessions = () =>
    (dispatch, getState) => {
        dispatch(createAction(UPDATE_SESSIONS_START)());
        return SessionsApi.getAllSessions()
            .then(sessions => dispatch(createAction(UPDATE_SESSIONS_COMPLETE)(immutable.fromJS(sessions))))
            .then(() => dispatch(createAction(UPDATE_LAST_CONTACT_START)()))
            .then(CommsApi.getLastContact)
            .then(lastContact => dispatch(createAction(UPDATE_LAST_CONTACT_COMPLETE)(
                immutable.fromJS(CommsApi.mergeLastContact(lastContact, getState().get('sessions').get('sessions'))))),
                error => dispatch(createAction(UPDATE_LAST_CONTACT_ERROR)(error)))
            .catch(error => dispatch(createAction(UPDATE_SESSIONS_ERROR)(error)));
    };

export const getSession = (sessionId) =>
    (dispatch) => {
        const profileIds = [];
        dispatch(createAction(GET_SESSION_START)());
        return SessionsApi.getSession(sessionId)
            .then(session => {
                profileIds.push(session.speakerId);
                profileIds.push(session.adminId);
                dispatch(createAction(GET_SESSION_COMPLETE)(session));
            })
            .then(() => dispatch(createAction(GET_PROFILES_START)()))
            .then(() => profileIds.map(id => (id ? ProfilesService.getProfile(id) : null)))
            .then(promises => Promise.all(promises))
            .then(profiles => dispatch(createAction(GET_PROFILES_COMPLETE)(
                {
                    speaker: profiles[0],
                    admin: profiles[1],
                })),
                error => dispatch(createAction(GET_PROFILES_ERROR)(error)))
            .catch(error => dispatch(createAction(GET_SESSION_ERROR)(error)));
    };

export const changeViewSettings = createAction(VIEW_SETTINGS_CHANGED);
