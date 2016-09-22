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

const getResponseBody = (response) => {
    const bodyIsEmpty = response.status === 204;
    if (bodyIsEmpty) {
        return Promise.resolve();
    }
    return response.json();
};

class Api {
    performRequest(uri, requestData) {
        return new Promise((resolve, reject) => {
            fetch(uri, requestData)
                .then(handleErrors)
                .then(getResponseBody)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    }

    getAuthorizationHeaders() {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${AuthService.getAccessToken()}`);
        return headers;
    }

    getAuthorizationAndJsonHeaders() {
        const headers = this.getAuthorizationHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    get(uri) {
        const requestData = { headers: this.getAuthorizationHeaders() };
        return this.performRequest(uri, requestData);
    }

    patch(uri, op) {
        const headers = this.getAuthorizationAndJsonHeaders();
        const requestData = { method: 'PATCH', headers, body: JSON.stringify(op) };
        return this.performRequest(uri, requestData);
    }

    post(uri, obj) {
        const headers = this.getAuthorizationAndJsonHeaders();
        const body = JSON.stringify(obj);
        const requestData = { method: 'POST', headers, body };
        return this.performRequest(uri, requestData);
    }

    delete(uri) {
        const headers = this.getAuthorizationHeaders();
        const requestData = { method: 'DELETE', headers };
        return this.performRequest(uri, requestData);
    }

    put(uri, obj) {
        const headers = this.getAuthorizationAndJsonHeaders();
        const body = obj ? JSON.stringify(obj) : '';
        const requestData = { method: 'PUT', headers, body };
        return this.performRequest(uri, requestData);
    }
}

export default new Api();
