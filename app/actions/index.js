import { createAction } from 'redux-actions';
import SessionsService from '../services/SessionsService';
import SpeakersService from '../services/SpeakersService';
import EventsService from '../services/EventsService';
import CorrespondenceService from '../services/CorrespondenceService';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';
import moment from 'moment';

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
        if (session.admin) {
            dispatch(createAction(actionTypes.GET_CORRESPONDENCE_START)());
            return CorrespondenceService.getCorrespondence(session.admin.id, session.speaker.id)
                .then(correspondence => dispatch(createAction(actionTypes.GET_CORRESPONDENCE_COMPLETE)(correspondence)))
                .catch(error => dispatch(createAction(actionTypes.GET_CORRESPONDENCE_ERROR)(error)));
        }

        // Nothing to do if there's no admin (there can be no correspondence.
        // Returning an empty promise in case the caller piggybacks on it with Promise.then() etc
        return new Promise((resolve /* ,reject */) => {
            resolve(null);
        });
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

export const newSessionTitleEntered = (newTitle) =>
    createAction(actionTypes.NEW_SESSION_ADD_TITLE)(newTitle);

export const newSessionDescriptionEntered = (newDescription) =>
    createAction(actionTypes.NEW_SESSION_ADD_DESCRIPTION)(newDescription);

export const newSessionDateEntered = (newDate) =>
    createAction(actionTypes.NEW_SESSION_ADD_DATE)(newDate);

export const newSessionSpeakerSelected = (newSpeakerId) =>
    createAction(actionTypes.NEW_SESSION_ADD_SPEAKER_ID)(newSpeakerId);

export const newSessionAdminSelected = (newAdminId) =>
    createAction(actionTypes.NEW_SESSION_ADD_ADMIN_ID)(newAdminId);

// PENDING: Consider a better solution than passing 'history' to this action
// History should be passed in from this.props.history by the caller
// (tried dispatching push(url) (push from react-router-redux), but it only updates history,
// does not navigate)
export const submitNewSession = (history) =>
    (dispatch, getState) => {
        dispatch(createAction(actionTypes.NEW_SESSION_SUBMIT_START)());
        const sessionInRedux = window.debug_session = getState().newsession;

        const newSessionPostData = {
            title: sessionInRedux.title,
            description: sessionInRedux.description,
            date: moment(sessionInRedux.date, 'D/M/YYYY').format(),
            speaker: { id: sessionInRedux.speakerId },
        };

        if (sessionInRedux.adminId) {
            newSessionPostData.admin = { id: sessionInRedux.adminId };
        }

        return SessionsService.postSession(newSessionPostData)
            .then(
                (newSessionId) => {
                    setTimeout(() => {
                        dispatch(createAction(actionTypes.NEW_SESSION_SUBMIT_COMPLETE)());
                        history.push(`/sessions/${newSessionId}`);
                    }, 5000);
                }
            )
            .catch(error => dispatch(createAction(actionTypes.NEW_SESSION_SUBMIT_ERROR)(error)));
    };

export const getAllSpeakers = (sessionId) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.NEW_SESSION_GET_SPEAKERS_START)());
        return SessionsService.getAllSpeakers(sessionId)
            .then(speakers => dispatch(createAction(actionTypes.NEW_SESSION_GET_SPEAKERS_COMPLETE)(speakers)))
            .catch(error => dispatch(createAction(actionTypes.NEW_SESSION_GET_SPEAKERS_ERROR)(error)));
    };

export const getAllAdmins = (sessionId) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.NEW_SESSION_GET_ADMINS_START)());
        return SessionsService.getAllAdmins(sessionId)
            .then(admins => dispatch(createAction(actionTypes.NEW_SESSION_GET_ADMINS_COMPLETE)(admins)))
            .catch(error => dispatch(createAction(actionTypes.NEW_SESSION_GET_ADMINS_ERROR)(error)));
    };

