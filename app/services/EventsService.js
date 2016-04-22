import api from './ApiService.js';
import immutable from 'immutable';

const sessionsUri = 'http://api.bris.tech';

class EventsService {
    getAllEvents() {
        return api.get(`${sessionsUri}/sessionsummaries`).then(immutable.List);
    }
}

export default new EventsService();
