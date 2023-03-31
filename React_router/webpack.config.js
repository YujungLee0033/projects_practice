const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.jsx', '.js', '.ts', '.tsx'],
    },
    

    entry: {
        app: './client',
    },
    module: {
        rules: [{
            test: /|.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 5% in KR', 'last 2 chrome versions'],
                        },
                        debug: true
                    }],
                    '@babel/preset-react'
                ],
                
                plugins: [
                    'react-refresh/babel',
                    '@babel/plugin-proposal-class-properties',
                ]
            },
            exclude: path.join(__dirname, 'node_modules'),
        }],
    },
    plugins: [        
        new RefreshWebpackPlugin()
    ],
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
    },
    devServer: {
        historyApiFallback: true,
        devMiddleware: { publicPath: '/dist' },
        static: { directory: path.resolve(__dirname) },
        hot: true
    },
};