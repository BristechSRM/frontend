import { combineReducers } from 'redux';
import sessions from './sessions';
import session from './session';
import newspeaker from './newspeaker';
import newsession from './newsession';
import newevent from './newevent';
import events from './events';
import event from './event';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    sessions,
    session,
    newspeaker,
    newsession,
    newevent,
    events,
    event,
    routing: routerReducer,
});
