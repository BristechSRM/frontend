// Use json schema faker to generate stub data
// See https://github.com/json-schema-faker/json-schema-faker
// and https://github.com/marak/faker.js
import jsf from 'json-schema-faker';
import _ from 'lodash';

const sessionSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            faker: 'random.uuid',
        },
        title: {
            type: 'string',
            faker: 'commerce.productName',
        },
        status: {
            type: 'string',
            enum: ['unassigned', 'assigned', 'in-progress', 'deferred', 'topic-approved', 'date-assigned'],
        },
        date: {
            type: 'string',
            faker: 'date.future',
        },
        speaker: {
            $ref: '#/definitions/speaker',
        },
        admin: {
            $ref: '#/definitions/admin',
        },
        lastContact: {
            $ref: '#/definitions/lastContact',
        },
    },
    required: ['id', 'title', 'status', 'date', 'speaker', 'admin', 'lastContact'],
    definitions: {
        speaker: {
            type: 'object',
            properties: {
                forename: {
                    type: 'string',
                    faker: 'name.firstName',
                },
                surname: {
                    type: 'string',
                    faker: 'name.lastName',
                },
                rating: {
                    $ref: '#/definitions/speakerRating',
                },
            },
            required: ['forename', 'surname', 'rating'],
        },
        admin: {
            type: 'object',
            properties: {
                forename: {
                    type: 'string',
                    faker: 'name.firstName',
                },
                surname: {
                    type: 'string',
                    faker: 'name.lastName',
                },
                imageUri: {
                    type: 'string',
                    faker: 'image.avatar',
                },
            },
            required: ['forename', 'surname', 'imageUri'],
        },
        speakerRating: {
            type: 'integer',
            minimum: 1,
            maximum: 5,
        },
        lastContact: {
            type: 'object',
            properties: {
                date: {
                    type: 'string',
                    faker: 'date.past',
                },
                speakerId: {
                    type: 'string',
                    faker: 'random.uuid',
                },
                adminId: {
                    type: 'string',
                    faker: 'random.uuid',
                },
            },
        },
    },
};

export const getStubSessions = (numberSessions) => _.range(1, numberSessions).map(() => jsf(sessionSchema));
