import 'babel-polyfill';
import DiscoveryService from './services/DiscoveryService';

DiscoveryService.init().then(() => {
    require('./bootstrap');
});
