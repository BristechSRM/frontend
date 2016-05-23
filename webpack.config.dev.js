const webpack = require('webpack');
const styleLintPlugin = require('stylelint-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');

errorWhenDevConfigIsMissing();

const webpackConfigShared = require('./webpack.config.shared');

module.exports = Object.assign({}, webpackConfigShared, {
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new styleLintPlugin({
            configFile: '.stylelintrc',
            failOnError: false,
        }),
                new copyPlugin([{
                    from: 'app/config/config.dev.json',
                    to: 'js/config.json',
                    force: true,
        }]),
    ],
    devServer: {
        contentBase: './public',
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true,
    },
});

function errorWhenDevConfigIsMissing() {
    const fs = require('fs');
    const path = require('path');

    const devConfigLocation = 'app/config/config.dev.json';

    try {
        fs.statSync(path.join(__dirname, devConfigLocation));
    } catch(err) {
        if(err.code === 'ENOENT') {
            console.error(`ERROR: ${devConfigLocation} is missing`);
            process.exit(1);
        }

        // Unable to determine why the error has occurred
        throw err;
    }
}
