import DiscoveryService from './DiscoveryService.js';
import api from './ApiService.js';

const speakersUri = DiscoveryService.getUri('api-gateway', '/speakers');

class SpeakersService {

    getSpeaker(speakerId) {
        return api.get(`${speakersUri}/${speakerId}`);
    }

    patchSpeaker(speakerId, path, value) {
        const op = { path, value };
        return api.patch(`${speakersUri}/${speakerId}`, op);
    }
}

export default new SpeakersService();
