import {
    handleActions,
} from 'redux-actions';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

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
    [actionTypes.UPDATE_SESSIONS_START]: (state) => state.set('isFetching', true),

    [actionTypes.UPDATE_SESSIONS_ERROR]: (state, action) =>
        state.withMutations(map => {
            map.set('isFetching', false)
                .set('error', action.payload);
        }),

    [actionTypes.UPDATE_SESSIONS_COMPLETE]: (state, action) =>
        state.withMutations(map => {
            map.set('isFetching', false)
                .set('sessions', action.payload);
        }),

    [actionTypes.UPDATE_LAST_CONTACT_START]: (state) =>
        state.update('sessions', sess => sess.map(s => s.set('speakerLastContact', null))),

    [actionTypes.UPDATE_LAST_CONTACT_COMPLETE]: (state, action) =>
        state.set('sessions', action.payload),

    [actionTypes.UPDATE_LAST_CONTACT_ERROR]: (state) =>
        state.update('sessions', sess => sess.map(s => s.set('speakerLastContact', 'Unknown'))),

    [actionTypes.VIEW_SETTINGS_CHANGED]: (state, action) =>
        state.set('viewSettings', action.payload),

}, initialState);

export default sessions;
