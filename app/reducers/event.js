import {
    handleActions,
} from 'redux-actions';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = new immutable.Record({
    isFetching: false,
    sessions: immutable.List(),
})();

const event = handleActions({
    [actionTypes.GET_EVENT_START]: (state) => state.set('isFetching', true),

    [actionTypes.GET_EVENT_ERROR]: (state, action) =>
        state.withMutations(map => {
            map.set('isFetching', false).set('error', action.payload);
        }),

    [actionTypes.GET_EVENT_COMPLETE]: (state, action) =>
        state.withMutations(map => {
            map.set('isFetching', false).set('sessions', action.payload);
        }),
}, initialState);

export default event;
