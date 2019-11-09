const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ip = require('ip');
const localIp = ip.address();

const ENV = process.env.NODE_ENV || 'dev';

const appSrc = [
    './frontend-src/scripts/app.js',
    './frontend-src/styles/style.scss'
];

const vendorSrc = [
    'jquery',
    'bootstrap-sass',
    './frontend-src/styles/vendor.scss'
    
];

const appConfigDev = require('./frontend-src/config/dev');
const appConfigDevApi = require('./frontend-src/config/dev-api');
const appConfigProd = require('./frontend-src/config/prod');

function composeConfig(env) {
    if (env === 'dev') {
        return _.merge({}, appConfigDev);
    }
    if (env === 'devApi') {
        return _.merge({}, appConfigDevApi);
    }
    if (env === 'prod') {
        return _.merge({}, appConfigProd);
    }
}

module.exports = {
    entry: {
        app: appSrc,
        vendor: vendorSrc
    },
    output: {
        path: path.resolve(__dirname, 'src/Kentico/CMS/App_Themes/Emakina'),
        filename: 'scripts/[name].js'
    },
    devtool: ENV === 'dev' || ENV === 'devApi' ? 'source-map' : 'none',
    resolve: {
        extensions: [".jsx", ".js"],
        alias: {
            pace: 'pace-progress'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader', 'eslint-loader'],
                exclude: [
                    path.resolve(__dirname, 'frontend-src/scripts/vendor'),
                    /node_modules/
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                    publicPath: '/'
                })
            },
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'css-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader'],
                    publicPath: '/'
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader?interpolate']
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: '../',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|ttf|eot|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            publicPath: '../'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'styles/[name].css',
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            template: 'frontend-src/html/index.html',
            filename: 'html/index.html',
            chunks: ['app', 'vendor']
        }),
        new webpack.DefinePlugin({
            __APP_CONFIG__: JSON.stringify(composeConfig(ENV))
        })
    ],

    devServer: {
        contentBase: path.join(__dirname, '/frontend-src'),
        compress: true,
        host: localIp,
        port: 1993,
        open: true,
        historyApiFallback: {
            rewrites: [{ from: /^\/$/, to: '/html/index.html' }]
        },
        watchContentBase: true
    }
};
