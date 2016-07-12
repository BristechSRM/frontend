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

export const changeSpeakerRatingEditMode = createAction(actionTypes.SPEAKER_RATING_EDITMODE_CHANGED,
    inEditMode => inEditMode);

export const changeSpeakerBioEditMode = createAction(actionTypes.SPEAKER_BIO_EDITMODE_CHANGED,
    inEditMode => inEditMode);

export const changeSpeakerRatingStash = createAction(actionTypes.SPEAKER_RATING_STASH_CHANGED,
    newValue => newValue);

export const updateSpeakerRating = (speakerId, newRating) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.UPDATE_SPEAKER_RATING_START)());
        return SpeakersService.updateRating(speakerId, newRating)
            .then(() => dispatch(createAction(actionTypes.UPDATE_SPEAKER_RATING_COMPLETE)(newRating)))
            .then(() => dispatch(changeSpeakerRatingEditMode(false)))
            .catch(error => dispatch(createAction(actionTypes.UPDATE_SPEAKER_RATING_ERROR)(error)));
    };
