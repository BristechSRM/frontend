import DiscoveryService from './DiscoveryService.js';
import api from './ApiService.js';

const eventsUri = DiscoveryService.getUri('api-gateway', '/events');

class EventsService {
    getAllEvents() {
        return api.get(eventsUri);
    }

    getEvent(eventId) {
        return api.get(`${eventsUri}/${eventId}`);
    }

    postEvent(event) {
        return api.post(eventsUri, event);
    }
}

export default new EventsService();
