import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import { REQUEST_SPEAKERS, SPEAKER_FILTER_CHANGED } from '../actions'

const initialState = immutable.Map({
  sessions: immutable.List(),
  sessionFilters: immutable.Map()
});

const sessions = handleActions({
  REQUEST_SPEAKERS: (state, action) => {    
    return state.set('sessions', action.payload);
  },

  SPEAKER_FILTER_CHANGED: (state, action) => {
    return state.withMutations(map => {
      map.set('sessions', action.payload.sessions)
         .set('sessionFilters', action.payload.filters);
    });
  }
}, initialState);

export default sessions;
