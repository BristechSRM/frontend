import {
    handleActions
} from 'redux-actions';
import immutable from 'immutable';
import {
    UPDATE_SESSIONS_START,
    UPDATE_SESSIONS_COMPLETE,
    UPDATE_SESSIONS_ERROR
} from '../actions'

const initialState = immutable.Map({
    isFetching: false,
    sessions: immutable.List(),
    viewSettings: immutable.Map({
        filters: immutable.Map(),
        sortProperty: "last-contacted",
        isSortOrderAscending: false
    })
});

const sessions = handleActions({
    [UPDATE_SESSIONS_START]: (state) => {
        return state.set('isFetching', true);
    },

    [UPDATE_SESSIONS_ERROR]: (state, action) => {
        return state.withMutations(map => {
            map.set('isFetching', false)
                .set('error', action.payload)
        });
    },

    [UPDATE_SESSIONS_COMPLETE]: (state, action) => {
        return state.withMutations(map => {
            map.set('isFetching', false)
                .set('sessions', action.payload.sessions)
                .setIn(['viewSettings', 'filters'], action.payload.filters)
                .setIn(['viewSettings', 'sortProperty'], action.payload.sortProperty)
                .setIn(['viewSettings', 'isSortOrderAscending'], action.payload.isSortOrderAscending)

            if (action.payload.refreshCache) {
                map.set('cachedSessions', action.payload.sessions);
            }
        });
    }
}, initialState);

export default sessions;
