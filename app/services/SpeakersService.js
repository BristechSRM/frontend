import DiscoveryService from './DiscoveryService.js';
import api from './ApiService.js';

const speakersUri = DiscoveryService.getUri('api-gateway', '/speakers');

class SpeakersService {

    getSpeaker(speakerId) {
        return api.get(`${speakersUri}/${speakerId}`);
    }

    patchSpeaker(speakerId, op) {
        return api.patch(`${speakersUri}/${speakerId}`, op);
    }

    updateRating(speakerId, newRating) {
        const op = { path: 'rating', value: newRating };
        return this.patchSpeaker(speakerId, op);
    }
}

export default new SpeakersService();
