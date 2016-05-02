import api from './ApiService.js';
import immutable from 'immutable';

const sessionsUri = 'http://api.bris.tech:8082/sessions';

const getProperty = (property, session) => {
    const propertyNames = {
        name: s => s.speakerSurname,
        'last-contact': s => (s.lastContact ? s.lastContact.date : ''),
        rating: s => s.speakerRating,
    };
    return propertyNames[property](session);
};

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
            return immutable.List();
        }

        const noFiltersEnabled = filters.every(f => !f);

        if (noFiltersEnabled === false) {
            filteredSessions = filteredSessions.filter(s => filters.get(s.get('status')));
        }

        const updatedSessions = filteredSessions.toJS().sort((a, b) => {
            const aProp = getProperty(sortProperty, a);
            const bProp = getProperty(sortProperty, b);

            let val = 0;
            if (aProp < bProp) {
                val = -1;
            } else if (aProp > bProp) {
                val = 1;
            }

            return isSortOrderAscending ? val : -1 * val;
        });

        return immutable.List(updatedSessions);
    }

    getSession(sessionId) {
        return api.get(`${sessionsUri}/${sessionId}`);
    }
}

export default new SessionsService();
