import DiscoveryService from './DiscoveryService.js';
import api from './ApiService.js';

const profilesUri = DiscoveryService.getUri('api-gateway', '/profiles');

class ProfilesService {

    getProfile(profileId) {
        return api.get(`${profilesUri}/${profileId}`);
    }
}

export default new ProfilesService();
