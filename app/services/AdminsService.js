import DiscoveryService from './DiscoveryService.js';
import api from './ApiService.js';

const adminsUri = DiscoveryService.getUri('api-gateway', '/admins');

class AdminsService {

    getAdmin(adminId) {
        return api.get(`${adminsUri}/${adminId}`);
    }
}

export default new AdminsService();
