import DiscoveryService from './DiscoveryService.js';
import api from './ApiService.js';

const meetupEventsUri = DiscoveryService.getUri('api-gateway', '/meetupevents');

class MeetupEventsService {

    get(id) {
        return api.get(`${meetupEventsUri}/${id}`);
    }

    post(meetup) {
        return api.post(meetupEventsUri, meetup);
    }
}

export default new MeetupEventsService();
