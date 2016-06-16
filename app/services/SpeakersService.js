import DiscoveryService from './DiscoveryService.js';
import api from './ApiService.js';

const speakersUri = DiscoveryService.getUri('api-gateway', '/speakers');

class SpeakersService {

    getSpeaker(speakerId) {
        return api.get(`${speakersUri}/${speakerId}`);
    }

    putSpeaker(speakerId, data) {
        return api.put(`${speakersUri}/${speakerId}`, data);
    }

    updateRating(speakerId, newRating) {
        return this.getSpeaker(speakerId)
            .then(speaker => {
                const s = speaker;
                s.rating = newRating;
                return this.putSpeaker(speakerId, speaker);
            });
    }
}

export default new SpeakersService();
