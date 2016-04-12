import {
    handleActions,
} from 'redux-actions';
import immutable from 'immutable';
import {
    UPDATE_SESSIONS_START,
    UPDATE_SESSIONS_COMPLETE,
    UPDATE_SESSIONS_ERROR,
    UPDATE_LAST_CONTACT_START,
    UPDATE_LAST_CONTACT_COMPLETE,
    UPDATE_LAST_CONTACT_ERROR,
    VIEW_SETTINGS_CHANGED,
} from '../actions';

const initialState = immutable.Map({
    isFetching: false,
    sessions: immutable.List(),
    viewSettings: immutable.Map({
        filters: immutable.Map(),
        sortProperty: 'last-contact',
        isSortOrderAscending: false,
    }),
});

const sessions = handleActions({
    [UPDATE_SESSIONS_START]: (state) => state.set('isFetching', true),

    [UPDATE_SESSIONS_ERROR]: (state, action) =>
        state.withMutations(map => {
            map.set('isFetching', false)
                .set('error', action.payload);
        }),

    [UPDATE_SESSIONS_COMPLETE]: (state, action) =>
        state.withMutations(map => {
            map.set('isFetching', false)
                .set('sessions', action.payload);
        }),

    [UPDATE_LAST_CONTACT_START]: (state) =>
        state.update('sessions', sess => sess.map(s => s.set('speakerLastContact', null))),

    [UPDATE_LAST_CONTACT_COMPLETE]: (state, action) =>
        state.set('sessions', action.payload),

    [UPDATE_LAST_CONTACT_ERROR]: (state) =>
        state.update('sessions', sess => sess.map(s => s.set('speakerLastContact', 'Unknown'))),

    [VIEW_SETTINGS_CHANGED]: (state, action) =>
        state.set('viewSettings', action.payload),

}, initialState);

export default sessions;
