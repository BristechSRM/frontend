import DiscoveryService from './DiscoveryService.js';
import api from './ApiService.js';

const speakersUri = DiscoveryService.getUri('api-gateway', '/speakers');

class SpeakersService {

    getSpeaker(speakerId) {
        return api.get(`${speakersUri}/${speakerId}`);
    }

    patchSpeaker(speakerId, operations) {
        return api.patch(`${speakersUri}/${speakerId}`, operations);
    }

    updateRating(speakerId, newRating) {
        const operations = [{ op: 'replace', path: '/rating', value: newRating }];
        return this.patchSpeaker(speakerId, operations);
    }
}

export default new SpeakersService();
