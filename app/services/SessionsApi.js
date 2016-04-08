import api from './ApiService.js';

class SessionsApi {
    getAllSessions() {
        return api.get('http://api.bris.tech/sessions');
    }
}

export default new SessionsApi();
