import DiscoveryService from './DiscoveryService.js';
import api from './ApiService.js';

const speakersUri = DiscoveryService.getUri('api-gateway', '/speakers');

class SpeakersService {

    getSpeaker(speakerId) {
        return api.get(`${speakersUri}/${speakerId}`);
    }

    postSpeaker(speaker) {
        return api.post(speakersUri, speaker);
    }

    patchSpeaker(speakerId, path, value) {
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);

        const op = { path, value: stringValue };
        return api.patch(`${speakersUri}/${speakerId}`, op);
    }
}

export default new SpeakersService();
