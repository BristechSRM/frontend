import urlJoin from 'url-join';
import fetch from 'isomorphic-fetch';

class DiscoveryService {
    init() {
        return fetch('/js/config.json')
            .then(response => response.json())
            .then(json => {
                this.config = json;
            });
    }

    getUri(name, relativeUri) {
        const baseUri = this.config.endpoints[name];

        if (!baseUri) {
            return null;
        }

        return urlJoin(baseUri, relativeUri);
    }
}

export default new DiscoveryService();
