import { combineReducers } from 'redux-immutable';
import sessions from './sessions';
import routing from './routing';

export default combineReducers({
    sessions,
    routing,
});
