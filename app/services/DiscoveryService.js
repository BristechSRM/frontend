import urlJoin from 'url-join';

class DiscoveryService {

    constructor() {
        this.services = [];
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

export default new DiscoveryService();
