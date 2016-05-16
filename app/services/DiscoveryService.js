import urlJoin from 'url-join';

const services = {
    ['bristech-srm']: {
        development: 'http://localhost:8080',
        production: 'http://srm.bris.tech',
    },
    ['api-gateway']: {
        development: 'http://apigateway:8080',
        production: 'http://api.bris.tech:8080',
    },
    ['auth']: {
        development: 'http://auth:8080',
        production: 'http://auth.bris.tech:8080',
    },
};

class DiscoveryService {

    registerServices(environment) {
        for (const service in services) {
            if (services.hasOwnProperty(service)) {
                const serviceDetails = services[service];
                const baseUri = serviceDetails[environment];
                if (baseUri) {
                    this.registerService(service, baseUri);
                }
            }
        }
    }

    constructor(environment) {
        this.services = [];
        this.registerServices(environment);
    }

    registerService(name, baseUri) {
        if (!name) {
            throw new Error('Invalid service name supplied');
        }

        if (!baseUri) {
            throw new Error('Invalid base URI supplied');
        }

        if (this.services[name]) {
            throw new Error(`Service with name "${name}" already registered`);
        }

        this.services[name] = baseUri;
    }

    getUri(name, relativeUri) {
        const baseUri = this.services[name];

        if (!baseUri) {
            return null;
        }

        return urlJoin(baseUri, relativeUri);
    }
}

// TODO: set to development or production based on environment variable
export default new DiscoveryService('production');
