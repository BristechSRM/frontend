import DiscoveryService from './DiscoveryService.js';

export const registerServices = (environment) => {
    const services = {
        ['bristech-srm']: {
            development: 'http://localhost:8080',
            production: 'http://srm.bris.tech',
        },
        ['api-gateway']: {
            development: 'http://localhost:9000',
            production: 'http://api.bris.tech:8080',
        },
        ['auth']: {
            development: 'http://localhost:9001',
            production: 'http://auth.bris.tech',
        },
    };

    for (const service in services) {
        if (services.hasOwnProperty(service)) {
            const serviceDetails = services[service];
            const baseUri = serviceDetails[environment];
            if (baseUri) {
                DiscoveryService.registerService(service, baseUri);
            }
        }
    }
};
