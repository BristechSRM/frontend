import { createAction } from 'redux-actions';
import SessionsService from '../services/SessionsService';
import SpeakersService from '../services/SpeakersService';
import EventsService from '../services/EventsService';
import MeetupEventsService from '../services/MeetupEventsService';
import NotesService from '../services/NotesService';
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

export const getNotesBySessionId = (sessionId) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.GET_NOTES_BY_SESSION_START)());
        return NotesService.getNotesBySessionId(sessionId)
            .then(notes => dispatch(createAction(actionTypes.GET_NOTES_BY_SESSION_COMPLETE)(notes)))
            .catch(error => dispatch(createAction(actionTypes.GET_NOTES_BY_SESSION_ERROR)(error)));
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

export const postMeetupEvent = (meetup) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.PUBLISH_MEETUPEVENT_START)());
        return MeetupEventsService.post(meetup)
            .then(() => dispatch(createAction(actionTypes.PUBLISH_MEETUPEVENT_COMPLETE)(meetup)))
            .then(() => dispatch(getAllEvents())) // Note: For more performance, could update events in events reducer to add new meetupEvent.
            .catch(error => dispatch(createAction(actionTypes.PUBLISH_MEETUPEVENT_ERROR)(error)));
    };

export const deleteMeetupEvent = (meetupEventId) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.DELETE_MEETUPEVENT_START)());
        return MeetupEventsService.delete(meetupEventId)
            .then(() => dispatch(createAction(actionTypes.DELETE_MEETUPEVENT_COMPLETE)(meetupEventId)))
            .then(() => dispatch(getAllEvents())) // Note: For more performance, could update events in events reducer to remove deleted meetupEvent.
            .catch(error => dispatch(createAction(actionTypes.DELETE_MEETUPEVENT_ERROR)(error)));
    };

export const updateMeetupEvent = (meetupEventId) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.UPDATE_MEETUPEVENT_START)());
        return MeetupEventsService.update(meetupEventId)
            .then(() => dispatch(createAction(actionTypes.UPDATE_MEETUPEVENT_COMPLETE)(meetupEventId)))
            .then(() => dispatch(getAllEvents())) // Note: For more performance, could update events in events reducer to update target meetupEvent.
            .catch(error => dispatch(createAction(actionTypes.UPDATE_MEETUPEVENT_ERROR)(error)));
    };

export const changeSessionViewEditMode = (record, field, inEditMode) =>
    createAction(actionTypes.SESSION_VIEW_EDITMODE_CHANGED)({ record, field, inEditMode });

export const changeSessionViewEditStash = (record, field, value, isInit = false) =>
    createAction(actionTypes.SESSION_VIEW_EDITSTASH_CHANGED)({ record, field, value, isInit });

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

export const updateSpeakerBio = (speakerId, newBio) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.UPDATE_SPEAKER_BIO_START)());
        return SpeakersService.patchSpeaker(speakerId, 'bio', newBio)
            .then(() => dispatch(createAction(actionTypes.UPDATE_SPEAKER_BIO_COMPLETE)(newBio)))
            .then(() => dispatch(changeSessionViewEditMode('speaker', 'bio', false)))
            .catch(error => dispatch(createAction(actionTypes.UPDATE_SPEAKER_BIO_ERROR)(error)));
    };

export const updateSpeakerHandles = (sessionId, speakerId, newHandles) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.UPDATE_SPEAKER_HANDLES_START)());
        return SpeakersService.patchSpeaker(speakerId, 'handles', newHandles)
            .then(() => dispatch(createAction(actionTypes.UPDATE_SPEAKER_HANDLES_COMPLETE)()))
            .then(() => dispatch(getSession(sessionId)))
            .then(() => dispatch(changeSessionViewEditMode('speaker', 'handles', false)))
            .catch(error => dispatch(createAction(actionTypes.UPDATE_SPEAKER_HANDLES_ERROR)(error)));
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

export const updateSessionEventId = (sessionId, newEventId) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.UPDATE_SESSION_EVENTID_START)());
        // Note: could reduce payload by only requesting event summary when updating, instead of full session.
        // Would require update to gateway for an event summary endpoint, and frontend propogation to session reducer
        return SessionsService.patchSession(sessionId, 'eventId', newEventId)
            .then(() => dispatch(createAction(actionTypes.UPDATE_SESSION_EVENTID_COMPLETE)(newEventId)))
            .then(() => dispatch(getSession(sessionId)))
            .then(() => dispatch(changeSessionViewEditMode('session', 'eventId', false)))
            .catch(error => dispatch(createAction(actionTypes.UPDATE_SESSION_EVENTID_ERROR)(error)));
    };

export const changeNoteStash = (editedNote) =>
    createAction(actionTypes.NOTE_EDITSTASH_CHANGED)(editedNote);

export const changeNoteEditMode = (noteId, inEditMode, currentNote) =>
    createAction(actionTypes.NOTE_EDITMODE_CHANGED)({ noteId, inEditMode, currentNote });

export const updateNote = (sessionId, noteId, editedNote) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.UPDATE_SESSION_NOTE_START)());

        return NotesService.patchNote(noteId, 'note', editedNote)
            .then(() => dispatch(createAction(actionTypes.UPDATE_SESSION_NOTE_COMPLETE)()))
            .then(() => dispatch(getNotesBySessionId(sessionId)))
            .then(() => dispatch(changeNoteEditMode(noteId, false)))
            .catch(error => dispatch(createAction(actionTypes.UPDATE_SESSION_NOTE_ERROR)(error)));
    };

export const changeNewNote = (newNote) =>
    createAction(actionTypes.CHANGE_NEW_SESSION_NOTE)(newNote);

export const clearNewNote = () =>
    createAction(actionTypes.CHANGE_NEW_SESSION_NOTE)('');

export const saveNewNote = (sessionId, newNote) =>
    (dispatch) => {
        dispatch(createAction(actionTypes.SAVE_NEW_SESSON_NOTE_START)());

        return NotesService.postNote(sessionId, newNote)
            .then(() => dispatch(createAction(actionTypes.SAVE_NEW_SESSON_NOTE_COMPLETE)()))
            .then(() => dispatch(getNotesBySessionId(sessionId)))
            .then(() => dispatch(clearNewNote()))
            .catch(error => dispatch(createAction(actionTypes.SAVE_NEW_SESSON_NOTE_ERROR)(error)));
    };

export const newSpeakerForenameChanged = (newForename) =>
    createAction(actionTypes.NEW_SPEAKER_ADD_FORENAME)(newForename);

export const newSpeakerSurnameChanged = (newSurname) =>
    createAction(actionTypes.NEW_SPEAKER_ADD_SURNAME)(newSurname);

export const newSpeakerImageUriChanged = (newImageUri) =>
    createAction(actionTypes.NEW_SPEAKER_ADD_IMAGEURI)(newImageUri);

export const newSpeakerBioChanged = (newBio) =>
    createAction(actionTypes.NEW_SPEAKER_ADD_BIO)(newBio);

export const newSpeakerSetNewSessionNext = (value) =>
    createAction(actionTypes.NEW_SPEAKER_SET_CREATE_SESSION_NEXT)(value);

// This action requires the react-route history object (from this.props.history) to be passed in,
// because the action re-routes the user to the 'edit session' page.
// Simply dispatching push(url) doesn't work - it updates history only.
export const submitNewSpeaker = (history) =>
    (dispatch, getState) => {
        dispatch(createAction(actionTypes.NEW_SPEAKER_SUBMIT_START)());
        const speakerInRedux = getState().newspeaker;

        const newSpeakerPostData = {
            forename: speakerInRedux.forename,
            surname: speakerInRedux.surname,
            imageUri: speakerInRedux.imageUri,
            bio: speakerInRedux.bio,
        };

        return SpeakersService.postSpeaker(newSpeakerPostData)
            .then(
                () => { // newSpeakerId
                    if (speakerInRedux.createSessionNext) {
                        setTimeout(() => {
                            dispatch(createAction(actionTypes.NEW_SPEAKER_SUBMIT_COMPLETE)());
                            history.push('/sessions/new');
                        }, 5000);
                    } else {
                        setTimeout(() => {
                            dispatch(createAction(actionTypes.NEW_SPEAKER_SUBMIT_COMPLETE)());
                            history.push('/dashboard');
                        }, 5000);
                    }
                }
            )
            .catch(error => dispatch(createAction(actionTypes.NEW_SPEAKER_SUBMIT_ERROR)(error)));
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
            id: '00000000-0000-0000-0000-000000000000',
            name: eventInRedux.name,
            date: moment(eventInRedux.date, 'D/M/YYYY').format(),
        };

        return EventsService.postEvent(newEventPostData)
            .then(() => {
                setTimeout(() => {
                    dispatch(createAction(actionTypes.NEW_EVENT_SUBMIT_COMPLETE)());
                    // TBD: Redirect to an event page (when such a thing exists)
                    // for now, redirect to the main calendar page, where at least
                    // the event can be seen.

                    // Eventually: history.push(`/events/${newEventId}`);
                    // For now:
                    history.push('/calendar');
                }, 5000);
            })
            .catch(error => dispatch(createAction(actionTypes.NEW_EVENT_SUBMIT_ERROR)(error)));
    };
