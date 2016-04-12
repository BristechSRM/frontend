import api from './ApiService.js';
import _ from 'lodash';
import immutable from 'immutable';

const sessionsUri = 'http://api.bris.tech';

class SessionsApi {

    getAllSessions() {
        return api.get(`${sessionsUri}/sessionsummaries`);
    }

    filterAndSort(sessions, filters, sortProperty, isSortOrderAscending) {
        let filteredSessions = sessions;

        if (!sessions) {
            return immutable.List();
        }

        const noFiltersEnabled = filters.every(f => !f);

        if (noFiltersEnabled === false) {
            filteredSessions = filteredSessions.filter(s => filters.get(s.get('status')));
        }

        const propertyNames = {
            name: 'speakerName',
            'last-contact': 'lastContact',
            rating: 'speakerRating',
        };

        const sortOrder = isSortOrderAscending ? 'asc' : 'desc';
        const updatedSessions = _.orderBy(
            filteredSessions.toJS(),
            propertyNames[sortProperty],
            sortOrder);

        return immutable.List(updatedSessions);
    }

    getSession(sessionId) {
        return api.get(`${sessionsUri}/sessions/${sessionId}`);
    }
}

export default new SessionsApi();
