import {
    createAction,
} from 'redux-actions';
import SessionsApi from '../services/SessionsApi';
import CommsApi from '../services/CommsApi';
import ProfilesService from '../services/ProfilesService';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

export const getAllSessions = () =>
    (dispatch, getState) => {
        dispatch(createAction(actionTypes.UPDATE_SESSIONS_START)());
        return SessionsApi.getAllSessions()
            .then(sessions => dispatch(createAction(actionTypes.UPDATE_SESSIONS_COMPLETE)(immutable.fromJS(sessions))))
            .then(() => dispatch(createAction(actionTypes.UPDATE_LAST_CONTACT_START)()))
            .then(CommsApi.getLastContact)
            .then(lastContact => dispatch(createAction(actionTypes.UPDATE_LAST_CONTACT_COMPLETE)(
                immutable.fromJS(CommsApi.mergeLastContact(lastContact, getState().get('sessions').get('sessions'))))),
                error => dispatch(createAction(actionTypes.UPDATE_LAST_CONTACT_ERROR)(error)))
            .catch(error => dispatch(createAction(actionTypes.UPDATE_SESSIONS_ERROR)(error)));
    };

export const getSession = (sessionId) =>
    (dispatch) => {
        const profileIds = [];
        dispatch(createAction(actionTypes.GET_SESSION_START)());
        return SessionsApi.getSession(sessionId)
            .then(session => {
                profileIds.push(session.speakerId);
                profileIds.push(session.adminId);
                dispatch(createAction(actionTypes.GET_SESSION_COMPLETE)(session));
            })
            .then(() => dispatch(createAction(actionTypes.GET_PROFILES_START)()))
            .then(() => profileIds.map(id => (id ? ProfilesService.getProfile(id) : null)))
            .then(promises => Promise.all(promises))
            .then(profiles => dispatch(createAction(actionTypes.GET_PROFILES_COMPLETE)(
                {
                    speaker: profiles[0],
                    admin: profiles[1],
                })),
                error => dispatch(createAction(actionTypes.GET_PROFILES_ERROR)(error)))
            .catch(error => dispatch(createAction(actionTypes.GET_SESSION_ERROR)(error)));
    };

export const changeViewSettings = createAction(actionTypes.VIEW_SETTINGS_CHANGED);
