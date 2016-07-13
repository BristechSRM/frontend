import { createAction } from 'redux-actions';
import SessionsService from '../services/SessionsService';
import SpeakersService from '../services/SpeakersService';
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

export const changeSessionViewEditMode = (field, inEditMode) =>
    createAction(actionTypes.SESSION_VIEW_EDITMODE_CHANGED)({ field, inEditMode });

export const changeSessionViewEditStash = (field, value) =>
    createAction(actionTypes.SESSION_VIEW_EDITSTASH_CHANGED)({ field, value });

export const updateSpeakerRating = (speakerId, newRating) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.UPDATE_SPEAKER_RATING_START)());
        return SpeakersService.patchSpeaker(speakerId, 'rating', newRating)
            .then(() => dispatch(createAction(actionTypes.UPDATE_SPEAKER_RATING_COMPLETE)(newRating)))
            .then(() => dispatch(changeSessionViewEditMode('speakerRating', false)))
            .catch(error => dispatch(createAction(actionTypes.UPDATE_SPEAKER_RATING_ERROR)(error)));
    };

export const updateSpeakerBio = (speakerId, newBio) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.UPDATE_SPEAKER_BIO_START)());
        return SpeakersService.patchSpeaker(speakerId, 'bio', newBio)
            .then(() => dispatch(createAction(actionTypes.UPDATE_SPEAKER_BIO_COMPLETE)(newBio)))
            .then(() => dispatch(changeSessionViewEditMode('speakerBio', false)))
            .catch(error => dispatch(createAction(actionTypes.UPDATE_SPEAKER_BIO_ERROR)(error)));
    };

export const updateSessionDescription = (sessionId, newDescription) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.UPDATE_SESSION_DESCRIPTION_START)());
        return SessionsService.patchSession(sessionId, 'description', newDescription)
            .then(() => dispatch(createAction(actionTypes.UPDATE_SESSION_DESCRIPTION_COMPLETE)(newDescription)))
            .then(() => dispatch(changeSessionViewEditMode('sessionDescription', false)))
            .catch(error => dispatch(createAction(actionTypes.UPDATE_SESSION_DESCRIPTION_ERROR)(error)));
    };
