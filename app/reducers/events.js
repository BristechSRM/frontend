import {
    handleActions,
} from 'redux-actions';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = new immutable.Record({
    isFetching: false,
    events: immutable.List(),
    error: null,
    meetupPublishError: null,
})();

const events = handleActions({
    [actionTypes.GET_EVENTS_START]: (state) => state.set('isFetching', true),

    [actionTypes.GET_EVENTS_ERROR]: (state, action) =>
        state.withMutations(map => {
            map.set('isFetching', false).set('error', action.payload);
        }),

    [actionTypes.PUBLISH_MEETUPEVENT_ERROR]: (state, action) => state.set('meetupPublishError', action.payload),
    [actionTypes.DELETE_MEETUPEVENT_ERROR]: (state, action) => state.set('meetupPublishError', action.payload),
    [actionTypes.UPDATE_MEETUPEVENT_ERROR]: (state, action) => state.set('meetupPublishError', action.payload),

    [actionTypes.GET_EVENTS_COMPLETE]: (state, action) =>
        state.withMutations(map => {
            map.set('isFetching', false).set('events', action.payload);
        }),
}, initialState);

export default events;
