const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ip = require('ip');
const localIp = ip.address();

const appSrc = [
    './frontend-src/scripts/app.js',
    './frontend-src/styles/style.scss'
];

const vendorSrc = [
    'jquery',
    'bootstrap-sass',
    './frontend-src/styles/vendor.scss'
];

module.exports = {
    entry: {
        app: appSrc,
        vendor: vendorSrc
    },
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: 'scripts/[name].js'
    },
    devtool: 'inline-source-map',
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
        new HtmlWebpackPlugin({
            template: 'frontend-src/html/testing-img.html',
            filename: 'html/testing-img.html',
            chunks: ['app', 'vendor']
        }),
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
