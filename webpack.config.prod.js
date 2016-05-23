const webpack = require('webpack');
const copyPlugin = require('copy-webpack-plugin');

process.env.NODE_ENV = 'production';

const webpackConfigShared = require('./webpack.config.shared');

module.exports = Object.assign({}, webpackConfigShared, {
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new copyPlugin([{
            from: 'app/config/config.prod.json',
            to: 'js/config.json',
            force: true,
        }]),
    ],
});
