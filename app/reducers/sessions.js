import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import { REQUEST_SPEAKERS, SESSION_VIEW_SETTINGS_CHANGED } from '../actions'

const initialState = immutable.Map({
  sessions: immutable.List(),
  viewSettings: immutable.Map({
    filters: immutable.Map({}),
    sortProperty: "last-contacted",
    isSortOrderAscending: false  
  })
});

const sessions = handleActions({
  REQUEST_SPEAKERS: (state, action) => {
    return state.set('sessions', action.payload);
  },

  SESSION_VIEW_SETTINGS_CHANGED: (state, action) => {
    return state.withMutations(map => {
      map.set('sessions', action.payload.sessions)
         .set('viewSettings', action.payload.viewSettings);
    });
  }
}, initialState);

export default sessions;
