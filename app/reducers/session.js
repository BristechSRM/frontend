import {handleActions} from 'redux-actions';
import immutable from 'immutable';
import {
    GET_SESSION_START,
    GET_SESSION_COMPLETE,
    GET_SESSION_ERROR
} from '../actions'

const initialState = immutable.Map({
    isFetching: false,
    session: {}
});

const session = handleActions({
    [GET_SESSION_START]: (state) => {
        return state.set('isFetching', true);
    },

    [GET_SESSION_ERROR]: (state, action) => {
        return state.withMutations(map => {
            map.set('isFetching', false)
                .set('error', action.payload)
        });
    },

    [GET_SESSION_COMPLETE]: (state, action) => {
        return state.withMutations(map => {
            map.set('isFetching', false)
                .set('session', action.payload)
        });
    }
}, initialState);

export default session;
