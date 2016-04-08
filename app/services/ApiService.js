import fetch from 'isomorphic-fetch';

const handleErrors = (response) => {
    return new Promise((resolve, reject) => {
        if (!response) {
            reject("No response returned from fetch");
            return;
        }

        if (response.ok) {
            resolve(response);
            return;
        }

        return response.json()
            .then(json => {
                const error = json || { message: response.statusText };
                reject(error);
            });
    });
}

class Api {
    get(uri) {
        return new Promise((resolve, reject) => {
            fetch(uri)
                .then(handleErrors)
                .then(response => response.json())
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    }
}

export default new Api();
