import api from './ApiService.js';

class CommsApi {
    getLastContact() {
        return api.get('http://api.bris.tech:8080/last-contact');
    }

    mergeLastContact(lastContact, sessions) {
        // TODO: merge lastContact into sessions based on threadId
        return sessions;
    }
}

export default new CommsApi();
