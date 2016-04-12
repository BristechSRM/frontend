import api from './ApiService.js';

class CommsApi {
    getLastContact() {
        return api.get('http://api.bris.tech:8080/last-contact');
    }

    mergeLastContact(lastContact, sessions) {
        const newSessions = [];
        sessions.forEach(session => {
            const lastContactRecord = lastContact.find(record => record.threadId === session.threadId);
            newSessions.push(session.set('speakerLastContact', lastContactRecord ? lastContactRecord.date : 'Never'));
        });
        return newSessions;
    }
}

export default new CommsApi();
