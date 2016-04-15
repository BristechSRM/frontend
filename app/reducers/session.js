import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = immutable.Map({
    isFetching: false,
    session: {},
    speaker: {},
    admin: {},
});

const session = handleActions({
    [actionTypes.GET_SESSION_START]: (state) =>
        state.withMutations(map => {
            map.set('isFetching', true)
                .set('session', {})
                .set('speaker', {})
                .set('admin', {});
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

    [actionTypes.GET_PROFILES_START]: (state) =>
        state.withMutations(map => {
            map.set('speaker', {})
                .set('admin', {});
        }),

    [actionTypes.GET_PROFILES_COMPLETE]: (state, action) =>
        state.withMutations(map => {
            map.set('speaker', action.payload.speaker)
                .set('admin', action.payload.admin);
        }),

    [actionTypes.GET_PROFILES_ERROR]: (state) =>
        state.withMutations(map => {
            map.set('speaker', {})
                .set('admin', {});
        }),
}, initialState);

export default session;
