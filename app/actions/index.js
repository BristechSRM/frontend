import { createAction } from 'redux-actions';
import SessionsService from '../services/SessionsService';
import CommsService from '../services/CommsService';
import ProfilesService from '../services/ProfilesService';
import EventsService from '../services/EventsService';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

export const getAllSessions = () =>
    (dispatch) => {
        dispatch(createAction(actionTypes.UPDATE_SESSIONS_START)());
        return SessionsService.getAllSessions()
            .then(sessions => dispatch(createAction(actionTypes.UPDATE_SESSIONS_COMPLETE)(immutable.List(sessions))))
            .catch(error => dispatch(createAction(actionTypes.UPDATE_SESSIONS_ERROR)(error)));
    };

export const getSession = (sessionId) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.GET_SESSION_START)());
        return SessionsService.getSession(sessionId)
            .then(session => dispatch(createAction(actionTypes.GET_SESSION_COMPLETE)(session)))
            .catch(error => dispatch(createAction(actionTypes.GET_SESSION_ERROR)(error)));
    };

export const changeViewSettings = createAction(actionTypes.VIEW_SETTINGS_CHANGED,
     settings => new immutable.Record(settings)());

export const getSpeaker = (profileId) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.GET_SPEAKER_START)());
        return ProfilesService.getProfile(profileId)
            .then(profile => dispatch(createAction(actionTypes.GET_SPEAKER_COMPLETE)(profile)))
            .catch(error => dispatch(createAction(actionTypes.GET_SPEAKER_ERROR)(error)));
    };

export const getAdmin = (profileId) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.GET_ADMIN_START)());
        return ProfilesService.getProfile(profileId)
            .then(profile => dispatch(createAction(actionTypes.GET_ADMIN_COMPLETE)(profile)))
            .catch(error => dispatch(createAction(actionTypes.GET_ADMIN_ERROR)(error)));
    };

export const getCorrespondence = (threadId) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.GET_CORRESPONDENCE_START)());
        return CommsService.getThread(threadId)
            .then(thread => dispatch(createAction(actionTypes.GET_CORRESPONDENCE_COMPLETE)(thread.items)))
            .catch(error => dispatch(createAction(actionTypes.GET_CORRESPONDENCE_ERROR)(error)));
    };

export const getAllEvents = () =>
    (dispatch) => {
        dispatch(createAction(actionTypes.GET_EVENTS_START)());
        return EventsService.getAllEvents()
            .then(events => dispatch(createAction(actionTypes.GET_EVENTS_COMPLETE)(immutable.List(events))))
            .catch(error => dispatch(createAction(actionTypes.GET_EVENTS_ERROR)(error)));
    };

export const getEvent = (eventId) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.GET_EVENT_START)());
        return EventsService.getEvent(eventId)
            .then(event => dispatch(createAction(actionTypes.GET_EVENT_COMPLETE)(immutable.List(event.sessions))))
            .catch(error => dispatch(createAction(actionTypes.GET_EVENT_ERROR)(error)));
    };
