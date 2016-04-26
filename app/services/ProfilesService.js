import api from './ApiService.js';

const profilesUri = 'http://api.bris.tech/profiles';

class ProfilesService {

    getProfile(profileId) {
        return api.get(`${profilesUri}/${profileId}`);
    }
}

export default new ProfilesService();
