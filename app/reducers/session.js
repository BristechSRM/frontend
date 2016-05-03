import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = new immutable.Record({
    isFetching: false,
    session: new immutable.Record(),
    correspondence: immutable.List(),
    lastContact: 'Unknown',
})();

const session = handleActions({
    [actionTypes.GET_SESSION_START]: (state) =>
        state.withMutations(map => {
            map.set('isFetching', true)
                .set('session', {});
        }),

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
    [actionTypes.GET_SPEAKER_START]: (state) => state.set('speaker', immutable.Record()),

    [actionTypes.GET_SPEAKER_COMPLETE]: (state, action) => state.set('speaker', action.payload),

    [actionTypes.GET_SPEAKER_ERROR]: (state) => state.set('speaker', immutable.Record()),

    [actionTypes.GET_ADMIN_START]: (state) => state.set('admin', immutable.Record()),

    [actionTypes.GET_ADMIN_COMPLETE]: (state, action) => state.set('admin', action.payload),

    [actionTypes.GET_ADMIN_ERROR]: (state) => state.set('admin', immutable.Record()),

    [actionTypes.GET_CORRESPONDENCE_START]: (state) =>
        state.withMutations(map => {
            map.set('correspondence', immutable.List())
                .set('lastContact', immutable.Record());
        }),

    [actionTypes.GET_CORRESPONDENCE_COMPLETE]: (state, action) =>
        state.withMutations(map => {
            map.set('correspondence', action.payload)
                .set('lastContact', action.payload.reduce(
                    (prev, cur) => (cur.date > prev ? cur.date : prev), '') || 'Never'
                );
        }),

    [actionTypes.GET_CORRESPONDENCE_ERROR]: (state) =>
        state.withMutations(map => {
            map.set('correspondence', immutable.Record())
                .set('lastContact', 'Unknown');
        }),
}, initialState);

export default session;
