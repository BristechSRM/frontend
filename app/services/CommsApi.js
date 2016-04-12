import api from './ApiService.js';

class CommsApi {
    getLastContact() {
        return api.get('http://api.bris.tech:8080/last-contact');
    }
}

export default new CommsApi();
