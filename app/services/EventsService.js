import api from './ApiService.js';
import immutable from 'immutable';

const sessionsUri = 'http://api.bris.tech';

class EventsService {
    getAllEvents() {
        const events = [{
            id: 'df191161-7cf3-4230-9b19-d92bcb0dfe0c',
            date: Date.now(),
            sessions: [
                'df191161-7cf3-4230-9b19-d92bcb0dfe0c',
            ],
        }, {
            id: '88dadaf1-d5f3-4d5d-b7e7-4bcff980128e',
            date: Date.now(),
            sessions: [
                'df191161-7cf3-4230-9b19-d92bcb0dfe0c',
                '88dadaf1-d5f3-4d5d-b7e7-4bcff980128e',
            ],
        }];

        return new Promise((resolve) => {
            resolve(events);
        });
    }
}

export default new EventsService();
