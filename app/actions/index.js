import { createAction } from 'redux-actions';
import SessionsApi from '../services/SessionsApi';
import CommsApi from '../services/CommsApi';
import immutable from 'immutable';

export const UPDATE_SESSIONS_START = 'UPDATE_SESSIONS_START';
export const UPDATE_SESSIONS_COMPLETE = 'UPDATE_SESSIONS_COMPLETE';
export const UPDATE_SESSIONS_ERROR = 'UPDATE_SESSIONS_ERROR';

export const VIEW_SETTINGS_CHANGED = 'VIEW_SETTINGS_CHANGED';

export const GET_SESSION_START = 'GET_SESSION_START';
export const GET_SESSION_COMPLETE = 'GET_SESSION_COMPLETE';
export const GET_SESSION_ERROR = 'GET_SESSION_ERROR';

const mergeLastContacted = sessions => {
    // TODO: merge lastContacted into sessions
    return CommsApi.getLastContacted()
        .then(() => sessions);
}

const getSessionsFromServer = () => {
    return SessionsApi.getAllSessions()
        // .then(sessions => mergeLastContacted(sessions))
        .then(sessions => immutable.List(sessions));
}

const getSessionFromServer = (sessionId) => {
    return SessionsApi.getSession(sessionId);
}

export const getAllSessions = () => {
    return (dispatch) => {
        dispatch(createAction(UPDATE_SESSIONS_START)());
        return getSessionsFromServer()
            .then(sessions => dispatch(createAction(UPDATE_SESSIONS_COMPLETE)(sessions)))
            .catch(error => dispatch(createAction(UPDATE_SESSIONS_ERROR)(error)));
    }
};

export const changeViewSettings = createAction(VIEW_SETTINGS_CHANGED);

export const getSession = (sessionId) => {
    return (dispatch) => {
        dispatch(createAction(GET_SESSION_START)());
        return getSessionFromServer(sessionId)
            .then(session => dispatch(createAction(GET_SESSION_COMPLETE)(session)))
            .catch(error => dispatch(createAction(GET_SESSION_ERROR)(error)));
    }
};
