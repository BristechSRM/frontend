var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = {
    devtool: 'eval-source-map',
    entry: __dirname + '/app/main.js',
    output: {
        path: __dirname + '/build',
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
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './public',
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};

module.exports = webpackConfig;
