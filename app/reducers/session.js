import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = new immutable.Record({
    isFetching: false,
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
}, initialState);

export default session;
