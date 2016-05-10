const path = require('path');
const webpackConfig = require('./webpack.config');

module.exports = function karmaConfig(config) {
    config.set({
        basePath: path.join(__dirname, 'app'),
        browsers: ['PhantomJS'],
        files: [
            '**/*.spec.js',
        ],
        frameworks: ['mocha', 'chai'],
        reporters: ['mocha'],
        preprocessors: {
            '**/*.spec.js': ['webpack'],
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true,
        },
    });
};
