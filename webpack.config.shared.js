const path = require('path');

console.log(`NODE_ENV = ${process.env.NODE_ENV}`);

const webpackConfig = {
    entry: path.join(__dirname, 'app/main.js'),
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'js/main.js',
    },
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            loader: 'eslint-loader',
            exclude: /node_modules/,
        }],
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
        }, {
            test: /(\.scss|\.css)$/,
            loaders: [
                'style',
                'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                'postcss',
                'sass',
            ],
        }],
    },
    resolve: {
        extensions: ['', '.scss', '.js', '.json'],
    },
    postcss: [
        require('autoprefixer'),
    ],
    eslint: {
        configFile: '.eslintrc.json',
        formatter: require('eslint-friendly-formatter'),
    },
};

module.exports = webpackConfig;