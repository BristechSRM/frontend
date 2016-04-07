import fetch from 'isomorphic-fetch';

class SessionsApi {
    getAllSessions() {
        return new Promise((resolve, reject) => {
            fetch('http://api.bris.tech/sessions')
                .then(response => response.json())
                .then(sessions => resolve(sessions))
                .catch(error => reject(error));
        });
    }
}

export default new SessionsApi();
