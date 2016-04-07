import { createAction } from 'redux-actions';
import SessionsApi from '../services/SessionsApi';
import CommsApi from '../services/CommsApi';
import immutable from 'immutable';
import _ from 'lodash';

export const UPDATE_SESSIONS_START = 'UPDATE_SESSIONS_START';
export const UPDATE_SESSIONS_COMPLETE = 'UPDATE_SESSIONS_COMPLETE';
export const UPDATE_SESSIONS_ERROR = 'UPDATE_SESSIONS_ERROR';

const mergeLastContacted = sessions => {
  // TODO: merge lastContacted into sessions
    return CommsApi.getLastContacted()
      .then(() => sessions);
}

const getSessionsFromServer = () => {
    return SessionsApi.getAllSessions()
    .then(sessions => mergeLastContacted(sessions))
    .then(sessions => immutable.List(sessions));
}

const getSessionsFromState = state => {
    const sessions = state.get('sessions').get('cachedSessions');
    return Promise.resolve(sessions);
}

const filterAndSort = (sessions, filters, sortProperty, isSortOrderAscending, refreshCache) => {

    let filteredSessions = sessions;

    const noFiltersEnabled = filters.every(f => !f);

    if (noFiltersEnabled === false) {
        filteredSessions = filteredSessions.filter(s => filters.get(s.status.toString()));
    }

    var propertyNames = {
        'name': 'speakerName',
        'last-contacted': 'lastContacted',
        'rating': 'speakerRating'
    }

    const sortOrder = isSortOrderAscending ? 'asc' : 'desc';
    const updatedSessions = _.orderBy(
    filteredSessions.toJS(),
    propertyNames[sortProperty],
    sortOrder);

    return createAction(UPDATE_SESSIONS_COMPLETE)({
        sessions: immutable.List(updatedSessions),
        filters,
        sortProperty,
        isSortOrderAscending,
        refreshCache
    });
}

export const getSessions = (filters, sortProperty, isSortOrderAscending, forceUpdate) => {
    return (dispatch, getState) => {
        dispatch(createAction(UPDATE_SESSIONS_START)());
        const getSessions = forceUpdate === true ? getSessionsFromServer() : getSessionsFromState(getState());
        return getSessions.then(sessions => dispatch(
      filterAndSort(sessions, filters, sortProperty, isSortOrderAscending, forceUpdate)));
    }
};
