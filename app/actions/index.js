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
        // CorrespondenceService will error if there's no admin id available
        // (eg on a new session that has no admin assigned yet)
        if (session.admin) {
            dispatch(createAction(actionTypes.GET_CORRESPONDENCE_START)());
            return CorrespondenceService.getCorrespondence(session.admin.id, session.speaker.id)
                .then(correspondence => dispatch(createAction(actionTypes.GET_CORRESPONDENCE_COMPLETE)(correspondence)))
                .catch(error => dispatch(createAction(actionTypes.GET_CORRESPONDENCE_ERROR)(error)));
        }

        // Nothing to do if there's no admin (there can be no correspondence).
        // Returning an empty promise to maintain the interface, as all actions seem to return a Promise.
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

// This action requires the react-route history object (from this.props.history) to be passed in,
// because the action re-routes the user to the 'edit session' page.
// Simply dispatching push(url) doesn't work - it updates history only.
export const submitNewSession = (history) =>
    (dispatch, getState) => {
        dispatch(createAction(actionTypes.NEW_SESSION_SUBMIT_START)());
        const sessionInRedux = getState().newsession;

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

export const newEventNameEntered = (newName) =>
    createAction(actionTypes.NEW_EVENT_ADD_NAME)(newName);

export const newEventDateEntered = (newDate) =>
    createAction(actionTypes.NEW_EVENT_ADD_DATE)(newDate);

// This action requires the react-route history object (from this.props.history) to be passed in,
// because the action re-routes the user to the 'event details' page.
// Simply dispatching push(url) doesn't work - it updates history only.
export const submitNewEvent = (history) =>
    (dispatch, getState) => {
        dispatch(createAction(actionTypes.NEW_EVENT_SUBMIT_START)());
        const eventInRedux = getState().newevent;

        const newEventPostData = {
            name: eventInRedux.title,
            date: moment(eventInRedux.date, 'D/M/YYYY').format(),
        };

        return EventsService.postEvent(newEventPostData)
            .then(
                (newEventId) => {
                    setTimeout(() => {
                        dispatch(createAction(actionTypes.NEW_EVENT_SUBMIT_COMPLETE)());
                        alert('TBD: Redirect to the event page');
                        // TODO: Event details page in a future release
                        // TODO something like this: history.push(`/events/${newEventId}`);
                    }, 5000);
                }
            )
            .catch(error => dispatch(createAction(actionTypes.NEW_EVENT_SUBMIT_ERROR)(error)));
    };
