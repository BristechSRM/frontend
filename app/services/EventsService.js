import { getStubEvents, getStubEventSessions } from '../stub/events.js';

class EventsService {
    getAllEvents() {
        return new Promise((resolve) => {
            resolve(getStubEvents(8));
        });
    }

    getEvent(eventId) {
        return new Promise((resolve) => {
            const event = getStubEventSessions().find(e => e.id === eventId);
            resolve(event);
        });
    }
}

export default new EventsService();
