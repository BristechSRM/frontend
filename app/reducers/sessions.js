import {
    handleActions
} from 'redux-actions';
import immutable from 'immutable';
import {
    UPDATE_SESSIONS_START,
    UPDATE_SESSIONS_COMPLETE,
    UPDATE_SESSIONS_ERROR,
    VIEW_SETTINGS_CHANGED
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
        });
    },

    [VIEW_SETTINGS_CHANGED]: (state, action) => {
        return state.set('viewSettings', action.payload);
    }
}, initialState);

export default sessions;
