/* global OidcTokenManager */

class AuthService {
    constructor() {
        const settings = {
            authority: 'http://localhost:9003',
            client_id: 'bristechsrm',
            redirect_uri: 'http://localhost:8080/signed-in',
            post_logout_redirect_uri: 'http://localhost:8080',
            response_type: 'id_token token',
            scope: 'openid profile api',
        };

        this.tokenManager = new OidcTokenManager(settings);
    }

    isAuthenticated() {
        return !this.tokenManager.expired;
    }

    signIn() {
        if (this.isAuthenticated()) {
            return;
        }

        this.tokenManager.redirectForToken();
    }

    signOut() {
        this.tokenManager.redirectForLogout();
    }

    processTokenAsync() {
        return this.tokenManager.processTokenCallbackAsync();
    }
}

export default new AuthService();
