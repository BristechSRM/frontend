import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import { REQUEST_SPEAKERS, SPEAKER_FILTER_CHANGED } from '../actions'

const initialState = immutable.Map({
  speakers: immutable.List(),
  speakerFilters: immutable.Map()
});

const sessions = handleActions({
  REQUEST_SPEAKERS: (state, action) => {    
    return state.set('speakers', action.payload);
  },

  SPEAKER_FILTER_CHANGED: (state, action) => {
    return state.withMutations(map => {
      map.set('speakers', action.payload.speakers)
         .set('speakerFilters', action.payload.filters);
    });
  }
}, initialState);

export default sessions;
