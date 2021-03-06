import DiscoveryService from './DiscoveryService.js';
import api from './ApiService.js';
import _ from 'lodash';

const sessionsUri = DiscoveryService.getUri('api-gateway', '/sessions');
const speakersUri = DiscoveryService.getUri('api-gateway', '/speakers');
const adminsUri = DiscoveryService.getUri('api-gateway', '/admins');

const sortProperties = {
    name: {
        nullSelector: 'speakerSurname',
        sortSelector: 'speakerSurname',
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
            return [];
        }

        const noFiltersEnabled = filters.every(f => !f);

        if (noFiltersEnabled === false) {
            filteredSessions = filteredSessions.filter(s => filters[s.status]);
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
        return updatedSessions;
    }

    getSession(sessionId) {
        return api.get(`${sessionsUri}/${sessionId}`);
    }

    patchSession(sessionId, path, value) {
        const op = { path, value };
        return api.patch(`${sessionsUri}/${sessionId}`, op);
    }

    postSession(session) {
        return api.post(sessionsUri, session);
    }

    getAllSpeakers() {
        return api.get(speakersUri);
    }

    getAllAdmins() {
        return api.get(adminsUri);
    }

}

export default new SessionsService();
