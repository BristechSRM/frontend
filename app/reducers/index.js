import { combineReducers } from 'redux-immutable';
import sessions from './sessions';
import session from './session';
import events from './events';
import event from './event';
import routing from './routing';

export default combineReducers({
    sessions,
    session,
    events,
    event,
    routing,
});
