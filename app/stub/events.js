import moment from 'moment';

const eventIds = [
    'df191161-7cf3-4230-9b19-d92bcb0dfe0c',
    '21793e09-58e4-48fd-bb41-4cff140974b7',
];

const eventSessions = [{
    id: 'df191161-7cf3-4230-9b19-d92bcb0dfe0c',
    sessions: [{
        id: '903c6dd2-dfd8-44d3-8a36-e7ae6ce28d95',
        title: 'Docker Dive',
        description: 'description',
        speakerForename: 'Ben',
        speakerSurname: 'Byford',
        speakerBio: 'bio',
        speakerRating: 4,
        speakerImageUri: '/img/ben.png',
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
        speakerImageUri: '/img/ben.png',
    }, {
        id: 'd8cc8f72-2d97-4269-92d3-6d044a6d2af5',
        date: Date.now(),
        title: 'Development on Cloud Based Infrastructure',
        description: 'description',
        speakerForename: 'Melissa',
        speakerSurname: 'Abeel',
        speakerBio: 'bio',
        speakerRating: 4,
        speakerImageUri: '/img/melissa.png',
    }],
}];

const getRandom = (minInclusive, maxInclusive) =>
    Math.floor(Math.random() * (maxInclusive + 1)) + minInclusive;

export const getStubEventSessions = () => eventSessions;

export function* getStubEvents(eventNumber) {
    for (let i = 0; i < eventNumber; i++) {
        const eventId = eventIds[getRandom(0, eventIds.length - 1)];
        const event = getStubEventSessions().find(e => e.id === eventId);
        yield {
            id: eventId,
            date: moment().add(i, 'months'),
            sessions: event.sessions,
        };
    }
}
