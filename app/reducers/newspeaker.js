// Reducer for the 'state' on the 'newsession' page
import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const validateMandatory = (value) => (value ? null : 'Value required');

const initialState = new immutable.Record({
    forename: '',
    forenameValidationMessage: validateMandatory(''),
    surname: '',
    surnameValidationMessage: validateMandatory(''),
    imageUri: '',
    bio: '',
    submitMessage: null,
    createSessionNext: false,
    error: null,
})();

const newspeaker = handleActions({
    [actionTypes.NEW_SPEAKER_ADD_FORENAME]: (state, action) =>
        state
            .set('forename', action.payload)
            .set('forenameValidationMessage', validateMandatory(action.payload)),

    [actionTypes.NEW_SPEAKER_ADD_SURNAME]: (state, action) =>
        state
            .set('surname', action.payload)
            .set('surnameValidationMessage', validateMandatory(action.payload)),

    [actionTypes.NEW_SPEAKER_ADD_IMAGEURI]: (state, action) =>
        state
            .set('imageUri', action.payload),

    [actionTypes.NEW_SPEAKER_ADD_BIO]: (state, action) =>
        state
            .set('bio', action.payload),

    [actionTypes.NEW_SPEAKER_SET_CREATE_SESSION_NEXT]: (state, action) =>
        state
            .set('createSessionNext', action.payload),

    [actionTypes.NEW_SPEAKER_SUBMIT_START]:
        (state) => state.set('submitMessage', 'Saving new speaker...'),
    [actionTypes.NEW_SPEAKER_SUBMIT_COMPLETE]:
        () => initialState,
    [actionTypes.NEW_SPEAKER_SUBMIT_ERROR]:
        (state) => state.set('submitMessage', 'Error saving speaker.'),

}, initialState);

export default newspeaker;
