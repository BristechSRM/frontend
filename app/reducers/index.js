import { combineReducers } from 'redux-immutable';
import sessions from './sessions';
import session from './session';
import events from './events';
import routing from './routing';

export default combineReducers({
    sessions,
    session,
    events,
    routing,
});
