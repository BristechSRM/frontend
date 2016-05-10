import DiscoveryService from './DiscoveryService.js';
import api from './ApiService.js';

const corespondanceUri = DiscoveryService.getUri('api-gateway', '/correspondence');

class CorrespondenceService {
    getCorrespondence(senderId, receiverId) {
        return api.get(`${corespondanceUri}/?senderId=${senderId}&receiverId=${receiverId}`);
    }
}

export default new CorrespondenceService();
