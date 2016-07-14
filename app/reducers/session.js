import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialEditRecord = new immutable.Record({ inEditMode: false, valueChanged: false, value: null })();

const initialEditStash = new immutable.Record({
    speaker: new immutable.Record({
        forename: initialEditRecord,
        surname: initialEditRecord,
        rating: initialEditRecord,
        bio: initialEditRecord,
    })(),
    session: new immutable.Record({
        title: initialEditRecord,
        description: initialEditRecord,
    })(),
})();

const initialState = new immutable.Record({
    isFetching: false,
    editStash: initialEditStash,
    session: new immutable.Record({})(),
    correspondence: immutable.List(),
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

    [actionTypes.UPDATE_SESSION_DESCRIPTION_COMPLETE]: (state, action) =>
        state.setIn(['session', 'description'], action.payload),

    [actionTypes.UPDATE_SESSION_TITLE_COMPLETE]: (state, action) =>
        state.setIn(['session', 'title'], action.payload),

    [actionTypes.UPDATE_SPEAKER_RATING_COMPLETE]: (state, action) => {
        const newSpeaker = Object.assign({}, state.session.speaker, { rating: action.payload });
        return state.setIn(['session', 'speaker'], newSpeaker);
    },

    [actionTypes.UPDATE_SPEAKER_BIO_COMPLETE]: (state, action) => {
        const newSpeaker = Object.assign({}, state.session.speaker, { bio: action.payload });
        return state.setIn(['session', 'speaker'], newSpeaker);
    },

    [actionTypes.UPDATE_SPEAKER_FORENAME_COMPLETE]: (state, action) => {
        const newSpeaker = Object.assign({}, state.session.speaker, { forename: action.payload });
        return state.setIn(['session', 'speaker'], newSpeaker);
    },

    [actionTypes.UPDATE_SPEAKER_SURNAME_COMPLETE]: (state, action) => {
        const newSpeaker = Object.assign({}, state.session.speaker, { surname: action.payload });
        return state.setIn(['session', 'speaker'], newSpeaker);
    },

    [actionTypes.GET_CORRESPONDENCE_START]: (state) => state.set('isFetching', true),

    [actionTypes.GET_CORRESPONDENCE_COMPLETE]: (state, action) =>
        state.withMutations(map =>
            map.set('isFetching', false)
               .set('correspondence', immutable.List(action.payload))
        ),

    [actionTypes.GET_CORRESPONDENCE_ERROR]: (state, action) =>
        state.withMutations(map => {
            map.set('isFetching', false)
               .set('error', action.payload);
        }),

    [actionTypes.SESSION_VIEW_EDITMODE_CHANGED]: (state, action) =>
        state.withMutations(map => {
            const record = action.payload.record;
            const field = action.payload.field;
            const newMap = map.setIn(['editStash', record, field, 'inEditMode'], action.payload.inEditMode);
            if (!action.payload.inEditMode) {
                return newMap.setIn(['editStash', record, field, 'value'], null)
                    .setIn(['editStash', record, field, 'valueChanged'], false);
            }
            return newMap;
        }),

    [actionTypes.SESSION_VIEW_EDITSTASH_CHANGED]: (state, action) =>
        state.withMutations(map => {
            const record = action.payload.record;
            const field = action.payload.field;
            const newMap = map.setIn(['editStash', record, field, 'value'], action.payload.value);
            if (!map.getIn(['editStash', record, field, 'valueChanged'])) {
                return newMap.setIn(['editStash', record, field, 'valueChanged'], true);
            }
            return newMap;
        }),
}, initialState);

export default session;
