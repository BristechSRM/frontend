import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const intialEditRecord = new immutable.Record({ inEditMode: false, valueChanged: false, value: null })();

const initialEditStash = new immutable.Record({
    speakerRating: intialEditRecord,
    speakerBio: intialEditRecord,
    sessionDescription: intialEditRecord,
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

    [actionTypes.UPDATE_SESSION_DESCRIPTION_COMPLETE]: (state, action) =>
        state.setIn(['session', 'description'], action.payload),

    [actionTypes.UPDATE_SPEAKER_RATING_COMPLETE]: (state, action) => {
        const newSpeaker = Object.assign({}, state.session.speaker, { rating: action.payload });
        return state.setIn(['session', 'speaker'], newSpeaker);
    },

    [actionTypes.UPDATE_SPEAKER_BIO_COMPLETE]: (state, action) => {
        const newSpeaker = Object.assign({}, state.session.speaker, { bio: action.payload });
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

    [actionTypes.SESSION_VIEW_EDITMODE_CHANGED]: (state, action) =>
        state.withMutations(map => {
            const newMap = map.setIn(['editStash', action.payload.field, 'inEditMode'], action.payload.inEditMode);
            if (!action.payload.inEditMode) {
                return newMap.setIn(['editStash', action.payload.field, 'value'], null)
                    .setIn(['editStash', action.payload.field, 'valueChanged'], false);
            }
            return newMap;
        }),

    [actionTypes.SESSION_VIEW_EDITSTASH_CHANGED]: (state, action) =>
        state.withMutations(map => {
            const newMap = map.setIn(['editStash', action.payload.field, 'value'], action.payload.value);
            if (!map.getIn(['editStash', action.payload.field, 'valueChanged'])) {
                return newMap.setIn(['editStash', action.payload.field, 'valueChanged'], true);
            }
            return newMap;
        }),
}, initialState);

export default session;
