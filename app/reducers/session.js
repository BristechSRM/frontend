import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = new immutable.Record({
    isFetching: false,
    session: new immutable.Record({})(),
    admin: new immutable.Record({})(),
    speaker: new immutable.Record({})(),
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
                .set('session', action.payload);
        }),

    [actionTypes.GET_SPEAKER_START]: (state) => state.set('speaker', new immutable.Record({})()),

    [actionTypes.GET_SPEAKER_COMPLETE]: (state, action) => state.set('speaker', new immutable.Record(action.payload)()),

    [actionTypes.GET_SPEAKER_ERROR]: (state) => state.set('speaker', new immutable.Record({})()),

    [actionTypes.GET_ADMIN_START]: (state) => state.set('admin', new immutable.Record({})()),

    [actionTypes.GET_ADMIN_COMPLETE]: (state, action) => state.set('admin', new immutable.Record(action.payload)()),

    [actionTypes.GET_ADMIN_ERROR]: (state) => state.set('admin', new immutable.Record({})()),

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
