import api from './ApiService.js';
import _ from 'lodash';
import immutable from 'immutable';

class SessionsApi {
    getAllSessions() {
        return api.get('http://api.bris.tech/sessions');
    }

    filterAndSort(sessions, filters, sortProperty, isSortOrderAscending) {

        let filteredSessions = sessions;

        const noFiltersEnabled = filters.every(f => !f);

        if (noFiltersEnabled === false) {
            filteredSessions = filteredSessions.filter(s => filters.get(s.status.toString()));
        }

        const propertyNames = {
            'name': 'speakerName',
            'last-contacted': 'lastContacted',
            'rating': 'speakerRating'
        }

        const sortOrder = isSortOrderAscending ? 'asc' : 'desc';
        const updatedSessions = _.orderBy(
            filteredSessions.toJS(),
            propertyNames[sortProperty],
            sortOrder);

        return immutable.List(updatedSessions);
    }
}

export default new SessionsApi();
