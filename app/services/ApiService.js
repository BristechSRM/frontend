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
    performRequest(uri, requestData) {
        return new Promise((resolve, reject) => {
            fetch(uri, requestData)
                .then(handleErrors)
                .then(response => response.json())
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    }

    getAuthedHeaders() {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${AuthService.getAccessToken()}`);
        return headers;
    }

    getAuthedJsonHeaders() {
        const headers = this.getAuthedHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    get(uri) {
        const requestData = { headers: this.getAuthedHeaders() };
        return this.performRequest(uri, requestData);
    }

    put(uri, data) {
        const requestData = { method: 'PUT', headers: this.getAuthedJsonHeaders(), body: JSON.stringify(data) };
        return this.performRequest(uri, requestData);
    }

    patch(uri, operations) {
        const requestData = { method: 'PATCH', headers: this.getAuthedJsonHeaders(), body: JSON.stringify(operations) };
        return this.performRequest(uri, requestData);
    }
}

export default new Api();
