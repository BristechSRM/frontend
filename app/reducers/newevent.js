// Reducer for the 'state' on the 'newevent' page
import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';
import moment from 'moment';

const validateMandatory = (value) => (value ? null : 'Value required');

// TODO: Refactoring opportunity - both sessions and events forms use similar validation
const validateOptionalDate = (value) => {
    if (!value) {
        return null; // Optional so empty value is ok
    }
    const expectedDateFormat = 'D/M/YYYY';
    const strict = true;
    const parsedDate = moment(value, expectedDateFormat, strict);

    if (!parsedDate.isValid()) {
        // Note although we accept D/M/YYYY (as per 'moment.js'), the
        // user will better understand "DD/MM/YYYY"
        return 'Format required: DD/MM/YYYY';
    }

    return null;
};

// const validateMandatoryDate = (value) => {
    // return validateMandatory(value) && validateOptionalDate(value)
// };

const initialState = new immutable.Record({
    submitMessage: null,

    name: '',
    nameValidationMessage: validateMandatory(''),

    date: '',
    dateValidationMessage: validateOptionalDate(''),

    error: null,
})();


// handleActions creates a *reducer* from actions
const newevent = handleActions({
    [actionTypes.NEW_EVENT_ADD_NAME]: (state, action) =>
        state
            .set('name', action.payload)
            .set('nameValidationMessage', validateMandatory(action.payload)),

    [actionTypes.NEW_EVENT_ADD_DATE]: (state, action) =>
        state
            .set('date', action.payload)
            .set('dateValidationMessage', validateOptionalDate(action.payload)),

    [actionTypes.NEW_EVENT_SUBMIT_START]:
        (state) => state.set('submitMessage', 'Saving new event...'),
    [actionTypes.NEW_EVENT_SUBMIT_COMPLETE]:
        (state) => state.set('submitMessage', 'Saved.'),
    [actionTypes.NEW_EVENT_SUBMIT_ERROR]:
        (state) => state.set('submitMessage', 'Error saving event.'),

}, initialState);

export default newevent;
