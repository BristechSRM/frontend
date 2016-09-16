import DiscoveryService from './DiscoveryService.js';
import api from './ApiService.js';

const meetupEventsUri = DiscoveryService.getUri('api-gateway', '/meetupevents');

class MeetupEventsService {

    get(id) {
        return api.get(`${meetupEventsUri}/${id}`);
    }

    post(eventId) {
        return api.post(meetupEventsUri, eventId);
    }
}

export default new MeetupEventsService();
