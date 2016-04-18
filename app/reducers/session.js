import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = immutable.Map({
    isFetching: false,
    session: {},
    correspondence: [],
});

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
    [actionTypes.GET_SPEAKER_START]: (state) =>
        state.withMutations(map => {
            map.set('speaker', {});
        }),
    [actionTypes.GET_SPEAKER_COMPLETE]: (state, action) =>
        state.withMutations(map => {
            map.set('speaker', action.payload);
        }),
    [actionTypes.GET_SPEAKER_ERROR]: (state) =>
        state.withMutations(map => {
            map.set('speaker', {});
        }),
    [actionTypes.GET_ADMIN_START]: (state) =>
        state.withMutations(map => {
            map.set('admin', {});
        }),
    [actionTypes.GET_ADMIN_COMPLETE]: (state, action) =>
        state.withMutations(map => {
            map.set('admin', action.payload);
        }),
    [actionTypes.GET_ADMIN_ERROR]: (state) =>
        state.withMutations(map => {
            map.set('admin', {});
        }),
    [actionTypes.GET_CORRESPONDENCE_START]: (state) =>
        state.withMutations(map => {
            map.set('correspondence', []);
        }),
    [actionTypes.GET_CORRESPONDENCE_COMPLETE]: (state, action) =>
        state.withMutations(map => {
            map.set('correspondence', action.payload);
        }),
    [actionTypes.GET_CORRESPONDENCE_ERROR]: (state) =>
        state.withMutations(map => {
            map.set('correspondence', []);
        }),
}, initialState);

export default session;
