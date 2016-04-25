import {
    handleActions,
} from 'redux-actions';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = immutable.Map({
    isFetching: false,
    events: immutable.List(),
});

const events = handleActions({
    [actionTypes.GET_EVENTS_START]: (state) => state.set('isFetching', true),

    [actionTypes.GET_EVENTS_ERROR]: (state, action) =>
        state.withMutations(map => {
            map.set('isFetching', false).set('error', action.payload);
        }),

    [actionTypes.GET_EVENTS_COMPLETE]: (state, action) =>
        state.withMutations(map => {
            map.set('isFetching', false).set('events', action.payload);
        }),
}, initialState);

export default events;
