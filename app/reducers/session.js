import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import {
    GET_SESSION_START,
    GET_SESSION_COMPLETE,
    GET_SESSION_ERROR,
} from '../actions';

const initialState = immutable.Map({
    isFetching: false,
    session: {},
});

const session = handleActions({
    [GET_SESSION_START]: (state) =>
        state.set('isFetching', true),

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
}, initialState);

export default session;
