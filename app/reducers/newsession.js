// Reducer for the 'state' on the 'newsession' page
import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';
import moment from 'moment';

const validateMandatory = (value) => (value ? null : 'Value required');

const validateMandatoryDate = (value) => {
    const msg = validateMandatory(value);
    if (msg) {
        return msg;
    }

    const expectedDateFormat = 'D/M/YYYY';
    const strict = true;
    const parsedDate = moment(value, expectedDateFormat, strict);

    if (!parsedDate.isValid()) {
        return `Format required: ${expectedDateFormat}`;
    }

    return null;
};

const initialState = new immutable.Record({
    admins: [],
    speakers: [],
    isFetchingAdmins: true,
    isFetchingSpeakers: true,
    submitMessage: null,

    title: '',
    titleValidationMessage: validateMandatory(''),

    description: '',
    descriptionValidationMessage: validateMandatory(''),

    date: '',
    dateValidationMessage: validateMandatory(''),

    speakerId: null,
    speakerIdValidationMessage: validateMandatory(null),

    adminId: null,
    adminIdValidationMessage: validateMandatory(null),
    error: null,
})();


// handleActions creates a *reducer* from actions
const newsession = handleActions({
    [actionTypes.NEW_SESSION_ADD_TITLE]: (state, action) =>
        state
            .set('title', action.payload)
            .set('titleValidationMessage', validateMandatory(action.payload)),

    [actionTypes.NEW_SESSION_ADD_DESCRIPTION]: (state, action) =>
        state
            .set('description', action.payload)
            .set('descriptionValidationMessage', validateMandatory(action.payload)),

    [actionTypes.NEW_SESSION_ADD_DATE]: (state, action) =>
        state
            .set('date', action.payload)
            .set('dateValidationMessage', validateMandatoryDate(action.payload)),

    [actionTypes.NEW_SESSION_ADD_SPEAKER_ID]: (state, action) =>
        state
            .set('speakerId', action.payload)
            .set('speakerIdValidationMessage', validateMandatory(action.payload)),

    [actionTypes.NEW_SESSION_ADD_ADMIN_ID]: (state, action) =>
        state
            .set('adminId', action.payload)
            .set('adminIdValidationMessage', validateMandatory(action.payload)),

    [actionTypes.NEW_SESSION_GET_SPEAKERS_START]:
        (state) => state.set('isFetchingSpeakers', true),
    [actionTypes.NEW_SESSION_GET_SPEAKERS_COMPLETE]:
        (state, action) => state.set('isFetchingSpeakers', false).set('speakers', action.payload),
    [actionTypes.NEW_SESSION_GET_SPEAKERS_ERROR]:
        (state) => state.set('isFetchingSpeakers', false).set('error', 'error loading speakers'),
    [actionTypes.NEW_SESSION_GET_ADMINS_START]:
        (state) => state.set('isFetchingAdmins', true),
    [actionTypes.NEW_SESSION_GET_ADMINS_COMPLETE]:
        (state, action) => state.set('isFetchingAdmins', false).set('admins', action.payload),
    [actionTypes.NEW_SESSION_GET_ADMINS_ERROR]:
        (state) => state.set('isFetchingAdmins', false).set('error', 'error loading admins'),
    [actionTypes.NEW_SESSION_SUBMIT_START]:
        (state) => state.set('submitMessage', 'Saving new session...'),
    [actionTypes.NEW_SESSION_SUBMIT_COMPLETE]:
        (state) => state.set('submitMessage', 'Saved.'),
    [actionTypes.NEW_SESSION_SUBMIT_ERROR]:
        (state) => state.set('submitMessage', 'Error saving session.'),

}, initialState);

export default newsession;
