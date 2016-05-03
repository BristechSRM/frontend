import api from './ApiService.js';
import _ from 'lodash';

const sessionsUri = 'http://api.bris.tech:8082/sessions';

class SessionsService {

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getAllSessions() {
        return api.get(sessionsUri);
    }

    filterAndSort(sessions, filters, sortProperty, isSortOrderAscending) {
        let filteredSessions = sessions;

        if (!sessions) {
            return [];
        }

        const noFiltersEnabled = filters.every(f => !f);

        if (noFiltersEnabled === false) {
            filteredSessions = filteredSessions.filter(s => filters[s.status]);
        }

        const propertyNames = {
            name: 'speaker.surname',
            'last-contact': 'lastContact.date',
            rating: 'speaker.rating',
            'event-date': 'date',
        };

        const sortOrder = isSortOrderAscending ? 'asc' : 'desc';
        const updatedSessions = _.orderBy(
            filteredSessions.toJS(),
            propertyNames[sortProperty],
            sortOrder);

        return updatedSessions;
    }

    getSession(sessionId) {
        return api.get(`${sessionsUri}/${sessionId}`);
    }
}

export default new SessionsService();
