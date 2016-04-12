import api from './ApiService.js';
import _ from 'lodash';
import immutable from 'immutable';

const sessionsUri = 'http://api.bris.tech/sessions';

class SessionsApi {

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // TODO: /sessions endpoint should return threadId for each sessions
    // currently assigning a fixed value
    getAllSessions() {
        return api.get(sessionsUri)
            .then(sessions => sessions.map(s => {
                const updated = s;
                updated.threadId = this.getRandom(1, 2).toString();
                return s;
            }));
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
        return api.get(`${sessionsUri}/${sessionId}`);
    }
}

export default new SessionsApi();
