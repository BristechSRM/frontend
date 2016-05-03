import api from './ApiService.js';

const eventsUri = 'http://api.bris.tech:8082/events';

class EventsService {
    getAllEvents() {
        return api.get(eventsUri);
    }

    getEvent(eventId) {
        return api.get(`${eventsUri}/${eventId}`);
    }
}

export default new EventsService();
