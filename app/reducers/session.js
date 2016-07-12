import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialEditStash = new immutable.Record({
    speakerRating: new immutable.Record({ inEditMode: false, value: null })(),
    speakerBio: new immutable.Record({ inEditMode: false, value: null })(),
})();

const initialState = new immutable.Record({
    isFetching: false,
    editStash: initialEditStash,
    session: new immutable.Record({})(),
    correspondence: immutable.List(),
    lastContact: null,
    error: null,
})();

const session = handleActions({
    [actionTypes.GET_SESSION_START]: state => state.set('isFetching', true),

    [actionTypes.GET_SESSION_ERROR]: (state, action) =>
        state.withMutations(map => {
            map.set('isFetching', false)
                .set('error', action.payload);
        }),

    [actionTypes.GET_SESSION_COMPLETE]: (state, action) =>
        state.withMutations(map => {
            map.set('isFetching', false)
                .set('session', new immutable.Record(action.payload)());
        }),

    [actionTypes.UPDATE_SPEAKER_RATING_COMPLETE]: (state, action) => {
        const newSpeaker = Object.assign({}, state.session.speaker, { rating: action.payload });
        return state.setIn(['session', 'speaker'], newSpeaker);
    },

    [actionTypes.GET_CORRESPONDENCE_START]: (state) => state.set('isFetching', true),

    [actionTypes.GET_CORRESPONDENCE_COMPLETE]: (state, action) =>
        state.withMutations(map =>
            map.set('isFetching', false)
               .set('correspondence', immutable.List(action.payload))
               .set('lastContact',
                   action.payload.reduce(
                       (prev, cur) => (cur.date > prev ? cur.date : prev),
                       ''
                   ) || null
                )
        ),

    [actionTypes.GET_CORRESPONDENCE_ERROR]: (state, action) =>
        state.withMutations(map => {
            map.set('isFetching', false)
               .set('error', action.payload);
        }),

    [actionTypes.SPEAKER_RATING_EDITMODE_CHANGED]: (state, action) => {
        const newState = state.setIn(['editStash', 'speakerRating', 'inEditMode'], action.payload);

        if (!action.payload) {
            return newState.setIn(['editStash', 'speakerRating', 'value'], null);
        }
        return newState;
    },

    [actionTypes.SPEAKER_BIO_EDITMODE_CHANGED]: (state, action) => {
        const newState = state.setIn(['editStash', 'speakerBio', 'inEditMode'], action.payload);

        if (!action.payload) {
            return newState.setIn(['editStash', 'speakerBio', 'value'], null);
        }
        return newState;
    },

    [actionTypes.SPEAKER_RATING_STASH_CHANGED]: (state, action) =>
        state.setIn(['editStash', 'speakerRating', 'value'], action.payload),

    [actionTypes.SPEAKER_BIO_STASH_CHANGED]: (state, action) =>
        state.setIn(['editStash', 'speakerBio', 'value'], action.payload),
}, initialState);

export default session;
