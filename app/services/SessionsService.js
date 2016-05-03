import api from './ApiService.js';
import _ from 'lodash';
import immutable from 'immutable';

const sessionsUri = 'http://api.bris.tech:8082/sessions';

const sortProperties = {
    name: {
        nullSelector: 'speakerSurname',
        sortSelector: 'speakerSurname',
        nullIsLow: true,
    },
    'last-contact': {
        nullSelector: 'lastContact',
        sortSelector: 'lastContact.date',
        nullIsLow: true,
    },
    rating: {
        nullSelector: 'speakerRating',
        sortSelector: 'speakerRating',
        nullIsLow: true,
    },
    'event-date': {
        nullSelector: 'date',
        sortSelector: 'date',
        nullIsLow: false,
    },
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

        const nullSelector = sortProperties[sortProperty].nullSelector;
        const [withNull, withoutNull] = _.partition(
            filteredSessions.toJS(),
            [nullSelector, null]
        );

        const propertyName = sortProperties[sortProperty].sortSelector;
        const sortOrder = isSortOrderAscending ? 'asc' : 'desc';
        let updatedSessions = _.orderBy(
            withoutNull,
            propertyName,
            sortOrder
        );

        const nullsBefore = isSortOrderAscending === sortProperties[sortProperty].nullIsLow;
        updatedSessions = nullsBefore ? withNull.concat(updatedSessions) : updatedSessions.concat(withNull);
        return immutable.List(updatedSessions);
    }

    getSession(sessionId) {
        return api.get(`${sessionsUri}/${sessionId}`);
    }
}

export default new SessionsService();
