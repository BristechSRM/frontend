const events = [{
    id: 'df191161-7cf3-4230-9b19-d92bcb0dfe0c',
    date: Date.now(),
    sessions: [
        '903c6dd2-dfd8-44d3-8a36-e7ae6ce28d95',
    ],
}, {
    id: '21793e09-58e4-48fd-bb41-4cff140974b7',
    date: Date.now(),
    sessions: [
        '21793e09-58e4-48fd-bb41-4cff140974b7',
        'd8cc8f72-2d97-4269-92d3-6d044a6d2af5',
    ],
}];

const eventSessions = [{
    id: 'df191161-7cf3-4230-9b19-d92bcb0dfe0c',
    sessions: [{
        id: '903c6dd2-dfd8-44d3-8a36-e7ae6ce28d95',
        title: 'test',
        description: 'description',
        speakerForename: 'forename',
        speakerSurname: 'surname',
        speakerBio: 'bio',
        speakerRating: 4,
        speakerImageUri: '',
    }],
}, {
    id: '21793e09-58e4-48fd-bb41-4cff140974b7',
    sessions: [{
        id: '903c6dd2-dfd8-44d3-8a36-e7ae6ce28d95',
        date: Date.now(),
        title: 'Ethics and Algorithms',
        description: 'description',
        speakerForename: 'Ben',
        speakerSurname: 'Byford',
        speakerBio: 'bio',
        speakerRating: 4,
        speakerImageUri: '',
    }, {
        id: 'd8cc8f72-2d97-4269-92d3-6d044a6d2af5',
        date: Date.now(),
        title: 'Development on Cloud Based Infrastructure',
        description: 'description',
        speakerForename: 'Melissa',
        speakerSurname: 'Abeel',
        speakerBio: 'bio',
        speakerRating: 4,
        speakerImageUri: '',
    }],
}];

class EventsService {
    getAllEvents() {
        return new Promise((resolve) => {
            resolve(events);
        });
    }

    getEvent(eventId) {
        return new Promise((resolve) => {
            const event = eventSessions.find(e => e.id === eventId);
            resolve(event);
        });
    }
}

export default new EventsService();
