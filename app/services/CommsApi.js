import api from './ApiService.js';

const commsUri = 'http://localhost:9001';

class CommsApi {
    getLastContact() {
        return api.get(`${commsUri}/last-contact`);
    }

    mergeLastContact(lastContact, sessions) {
        const newSessions = [];
        sessions.forEach(session => {
            const lastContactRecord = lastContact.find(record => record.threadId === session.get('threadId'));
            newSessions.push(session.set('speakerLastContact', lastContactRecord ? lastContactRecord.date : 'Never'));
        });
        return newSessions;
    }

    getThread(threadId) {
        return api.get(`${commsUri}/threads/${threadId}`);
    }
}

export default new CommsApi();
