import { combineReducers } from 'redux';
import sessions from './sessions';
import session from './session';
import events from './events';
import event from './event';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    sessions,
    session,
    events,
    event,
    routing: routerReducer,
});
