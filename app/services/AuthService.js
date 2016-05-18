/* global OidcTokenManager */
import DiscoveryService from './DiscoveryService.js';

class AuthService {
    constructor() {
        const settings = {
            authority: DiscoveryService.getUri('auth'),
            client_id: 'bristechsrm',
            redirect_uri: DiscoveryService.getUri('bristech-srm', '/signed-in'),
            post_logout_redirect_uri: DiscoveryService.getUri('bristech-srm'),
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

    getAccessToken() {
        return this.tokenManager.access_token;
    }

    reauthenticate() {
        this.tokenManager.removeToken();
        this.tokenManager.redirectForToken();
    }
}

export default new AuthService();
