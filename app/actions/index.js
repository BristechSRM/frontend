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
        dispatch(createAction(actionTypes.GET_SESSION_START)());
        return SessionsApi.getSession(sessionId)
            .then(session => dispatch(createAction(actionTypes.GET_SESSION_COMPLETE)(session)))
            .catch(error => dispatch(createAction(actionTypes.GET_SESSION_ERROR)(error)));
    };

export const changeViewSettings = createAction(actionTypes.VIEW_SETTINGS_CHANGED);

export const getSpeaker = (profileId) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.GET_SPEAKER_START)());
        return ProfilesService.getProfile(profileId)
            .then(profile => dispatch(createAction(actionTypes.GET_SPEAKER_START)(profile)))
            .catch(error => dispatch(createAction(actionTypes.GET_SPEAKER_ERROR)(error)));
    };

export const getAdmin = (profileId) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.GET_ADMIN_START)());
        return ProfilesService.getProfile(profileId)
            .then(profile => dispatch(createAction(actionTypes.GET_ADMIN_START)(profile)))
            .catch(error => dispatch(createAction(actionTypes.GET_ADMIN_ERROR)(error)));
    };
