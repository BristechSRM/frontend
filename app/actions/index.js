import { createAction } from 'redux-actions';
import SessionsService from '../services/SessionsService';
import SpeakersService from '../services/SpeakersService';
import AdminsService from '../services/AdminsService';
import EventsService from '../services/EventsService';
import CorrespondenceService from '../services/CorrespondenceService';
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

export const getSpeaker = (speakerId) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.GET_SPEAKER_START)());
        return SpeakersService.getSpeaker(speakerId)
            .then(speaker => dispatch(createAction(actionTypes.GET_SPEAKER_COMPLETE)(speaker)))
            .catch(error => dispatch(createAction(actionTypes.GET_SPEAKER_ERROR)(error)));
    };

export const updateSpeakerRating = (speakerId, newRating) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.PUT_SPEAKER_START)());
        return SpeakersService.updateRating(speakerId, newRating)
            .then(speaker => dispatch(createAction(actionTypes.PUT_SPEAKER_COMPLETE)(speaker)))
            .catch(error => dispatch(createAction(actionTypes.PUT_SPEAKER_ERROR)(error)));
    };

export const getAdmin = (adminId) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.GET_ADMIN_START)());
        return AdminsService.getAdmin(adminId)
            .then(admin => dispatch(createAction(actionTypes.GET_ADMIN_COMPLETE)(admin)))
            .catch(error => dispatch(createAction(actionTypes.GET_ADMIN_ERROR)(error)));
    };

export const getCorrespondence = (session) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.GET_CORRESPONDENCE_START)());
        return CorrespondenceService.getCorrespondence(session.admin.id, session.speaker.id)
            .then(correspondence => dispatch(createAction(actionTypes.GET_CORRESPONDENCE_COMPLETE)(correspondence)))
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
