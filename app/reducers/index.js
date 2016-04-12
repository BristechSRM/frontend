import { combineReducers } from 'redux-immutable';
import sessions from './sessions';
import session from './session';
import routing from './routing';

export default combineReducers({
    sessions,
    session,
    routing,
});
