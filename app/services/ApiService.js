import fetch from 'isomorphic-fetch';

import AuthService from './AuthService';

const handleErrors = (response) =>
    new Promise((resolve, reject) => {
        if (!response) {
            reject({ message: 'No response returned from fetch' });
            return;
        }

        if (response.ok) {
            resolve(response);
            return;
        }

        if (response.status === 401 || response.status === 403) {
            AuthService.reauthenticate();
            return;
        }

        response.json()
            .then(json => {
                const error = json || { message: response.statusText };
                reject(error);
            });
    });

class Api {
    get(uri) {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${AuthService.getAccessToken()}`);

        return new Promise((resolve, reject) => {
            fetch(uri, { headers })
                .then(handleErrors)
                .then(response => response.json())
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    }
}

export default new Api();
