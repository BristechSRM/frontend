/* global OidcTokenManager */

class AuthService {
    constructor() {
        const settings = {
            authority: 'http://api.bris.tech:9003',
            client_id: 'bristechsrm',
            redirect_uri: 'http://srm.bris.tech/signed-in',
            post_logout_redirect_uri: 'http://srm.bris.tech',
            response_type: 'id_token token',
            scope: 'openid profile api',
        };

        this.tokenManager = new OidcTokenManager(settings);
    }

    isAuthenticated() {
        // TODO: return this.tokenManager.expired
        console.log(!this.tokenManager.expired);
        return true;
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
}

export default new AuthService();
