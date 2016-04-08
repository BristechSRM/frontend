var webpack = require('webpack');
var path = require('path');

console.log('NODE_ENV = ' + process.env.NODE_ENV);

var getProductionSettings = function () {
    return {
        devtool: 'cheap-module-source-map',
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin()
        ]
    }
}

var getDevelopmentSettings = function () {
    return {
        devtool: 'source-map',
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }
}

const settings =
    process.env.NODE_ENV === 'production' ? getProductionSettings() : getDevelopmentSettings();

var webpackConfig = {
    devtool: settings.devtool,
    entry: path.join(__dirname, 'app/main.js'),
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'main.js'
    },
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            loader: "eslint-loader",
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /(\.scss|\.css)$/,
            loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass'
        }]
    },
    resolve: {
        extensions: ['', '.scss', '.js', '.json']
    },
    postcss: [
        require('autoprefixer')
    ],
    eslint: {
        configFile: '.eslintrc.json',
        formatter: require('eslint-friendly-formatter'),
        fix: true
    },
    plugins: settings.plugins,
    devServer: {
        contentBase: './public',
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};

module.exports = webpackConfig;
