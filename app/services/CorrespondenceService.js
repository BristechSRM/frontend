import DiscoveryService from './DiscoveryService.js';
import api from './ApiService.js';

const correspondenceUri = DiscoveryService.getUri('api-gateway', '/correspondence');

class CorrespondenceService {
    getCorrespondence(senderId, receiverId) {
        return api.get(`${correspondenceUri}?senderId=${senderId}&receiverId=${receiverId}`);
    }
}

export default new CorrespondenceService();
