import {
    handleActions,
} from 'redux-actions';
import immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = new immutable.Record({
    isFetching: false,
    sessions: immutable.List(),
    viewSettings: new immutable.Record({
        filters: new immutable.Record({
            ['unassigned']: false,
            ['assigned']: false,
            ['in-progress']: false,
            ['deferred']: false,
            ['topic-approved']: false,
            ['date-assigned']: false,
        })(),
        sortProperty: 'last-contact',
        isSortOrderAscending: false,
    })(),
})();

const sessions = handleActions({
    [actionTypes.UPDATE_SESSIONS_START]: (state) => state.set('isFetching', true),

    [actionTypes.UPDATE_SESSIONS_ERROR]: (state, action) =>
        state.set('isFetching', false).set('error', action.payload),

    [actionTypes.UPDATE_SESSIONS_COMPLETE]: (state, action) =>
        state.set('isFetching', false).set('sessions', action.payload),

    [actionTypes.VIEW_SETTINGS_CHANGED]: (state, action) =>
        state.set('viewSettings', action.payload),

}, initialState);

export default sessions;
