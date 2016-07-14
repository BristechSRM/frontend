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

export const changeSessionViewEditMode = (record, field, inEditMode) =>
    createAction(actionTypes.SESSION_VIEW_EDITMODE_CHANGED)({ record, field, inEditMode });

export const changeSessionViewEditStash = (record, field, value) =>
    createAction(actionTypes.SESSION_VIEW_EDITSTASH_CHANGED)({ record, field, value });

export const updateSpeakerRating = (speakerId, newRating) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.UPDATE_SPEAKER_RATING_START)());
        return SpeakersService.patchSpeaker(speakerId, 'rating', newRating)
            .then(() => dispatch(createAction(actionTypes.UPDATE_SPEAKER_RATING_COMPLETE)(newRating)))
            .then(() => dispatch(changeSessionViewEditMode('speaker', 'rating', false)))
            .catch(error => dispatch(createAction(actionTypes.UPDATE_SPEAKER_RATING_ERROR)(error)));
    };

export const updateSpeakerBio = (speakerId, newBio) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.UPDATE_SPEAKER_BIO_START)());
        return SpeakersService.patchSpeaker(speakerId, 'bio', newBio)
            .then(() => dispatch(createAction(actionTypes.UPDATE_SPEAKER_BIO_COMPLETE)(newBio)))
            .then(() => dispatch(changeSessionViewEditMode('speaker', 'bio', false)))
            .catch(error => dispatch(createAction(actionTypes.UPDATE_SPEAKER_BIO_ERROR)(error)));
    };

export const updateSpeakerForename = (speakerId, newForename) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.UPDATE_SPEAKER_FORENAME_START)());
        return SpeakersService.patchSpeaker(speakerId, 'forename', newForename)
            .then(() => dispatch(createAction(actionTypes.UPDATE_SPEAKER_FORENAME_COMPLETE)(newForename)))
            .then(() => dispatch(changeSessionViewEditMode('speaker', 'forename', false)))
            .catch(error => dispatch(createAction(actionTypes.UPDATE_SPEAKER_FORENAME_ERROR)(error)));
    };

export const updateSpeakerSurname = (speakerId, newSurname) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.UPDATE_SPEAKER_SURNAME_START)());
        return SpeakersService.patchSpeaker(speakerId, 'surname', newSurname)
            .then(() => dispatch(createAction(actionTypes.UPDATE_SPEAKER_SURNAME_COMPLETE)(newSurname)))
            .then(() => dispatch(changeSessionViewEditMode('speaker', 'surname', false)))
            .catch(error => dispatch(createAction(actionTypes.UPDATE_SPEAKER_SURNAME_ERROR)(error)));
    };

export const updateSessionDescription = (sessionId, newDescription) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.UPDATE_SESSION_DESCRIPTION_START)());
        return SessionsService.patchSession(sessionId, 'description', newDescription)
            .then(() => dispatch(createAction(actionTypes.UPDATE_SESSION_DESCRIPTION_COMPLETE)(newDescription)))
            .then(() => dispatch(changeSessionViewEditMode('session', 'description', false)))
            .catch(error => dispatch(createAction(actionTypes.UPDATE_SESSION_DESCRIPTION_ERROR)(error)));
    };

export const updateSessionTitle = (sessionId, newTitle) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.UPDATE_SESSION_TITLE_START)());
        return SessionsService.patchSession(sessionId, 'title', newTitle)
            .then(() => dispatch(createAction(actionTypes.UPDATE_SESSION_TITLE_COMPLETE)(newTitle)))
            .then(() => dispatch(changeSessionViewEditMode('session', 'title', false)))
            .catch(error => dispatch(createAction(actionTypes.UPDATE_SESSION_TITLE_ERROR)(error)));
    };
