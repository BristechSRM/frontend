import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import { REQUEST_SPEAKERS, SESSION_VIEW_SETTINGS_CHANGED } from '../actions'

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
  REQUEST_SPEAKERS: (state, action) => {
    return state.set('sessions', action.payload);
  },

  UPDATE_SPEAKERS_START: (state, action) => {
    return state.set('isFetching', true);
  },

  UPDATE_SPEAKERS_COMPLETE: (state, action) => {    
    return state.withMutations(map => {
      map.set('isFetching', false)
         .set('sessions', action.payload.sessions)
         .setIn(['viewSettings', 'filters'], action.payload.filters)
         .setIn(['viewSettings', 'sortProperty'], action.payload.sortProperty)
         .setIn(['viewSettings', 'isSortOrderAscending'], action.payload.isSortOrderAscending)
    });
  },

  UPDATE_SPEAKERS_ERROR: (state, action) => {
    return state.set('isFetching', false);
  },

  SESSION_VIEW_SETTINGS_CHANGED: (state, action) => {
    return state.withMutations(map => {
      map.set('sessions', action.payload.sessions)
         .set('viewSettings', action.payload.viewSettings);
    });
  }
}, initialState);

export default sessions;
