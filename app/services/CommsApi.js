import fetch from 'isomorphic-fetch';

class CommsApi {
    getLastContacted() {
        return new Promise((resolve, reject) => {
            fetch('http://api.bris.tech:8080/last-contact')
                .then(response => response.json())
                .then(lastContacted => resolve(lastContacted))
                .catch(error => reject(error));
        });
    }
}

export default new CommsApi();
