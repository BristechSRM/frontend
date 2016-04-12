import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import {
    GET_SESSION_START,
    GET_SESSION_COMPLETE,
    GET_SESSION_ERROR,
    GET_PROFILES_START,
    GET_PROFILES_COMPLETE,
    GET_PROFILES_ERROR,
} from '../actions';

const initialState = immutable.Map({
    isFetching: false,
    session: {},
    speaker: {},
    admin: {},
});

const session = handleActions({
    [GET_SESSION_START]: (state) =>
        state.withMutations(map => {
            map.set('isFetching', true)
                .set('session', {})
                .set('speaker', {})
                .set('admin', {});
        }),

    [GET_SESSION_ERROR]: (state, action) =>
        state.withMutations(map => {
            map.set('isFetching', false)
                .set('error', action.payload);
        }),

    [GET_SESSION_COMPLETE]: (state, action) =>
        state.withMutations(map => {
            map.set('isFetching', false)
                .set('session', action.payload);
        }),

    [GET_PROFILES_START]: (state) =>
        state.withMutations(map => {
            map.set('speaker', {})
                .set('admin', {});
        }),

    [GET_PROFILES_COMPLETE]: (state, action) =>
        state.withMutations(map => {
            map.set('speaker', action.payload.speaker)
                .set('admin', action.payload.admin);
        }),

    [GET_PROFILES_ERROR]: (state) =>
        state.withMutations(map => {
            map.set('speaker', {})
                .set('admin', {});
        }),
}, initialState);

export default session;
