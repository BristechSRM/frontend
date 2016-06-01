import discoveryService from '../services/DiscoveryService';
discoveryService.config = {
    endpoints: [],
};

// Globally available in app
window.OidcTokenManager = () => {};
