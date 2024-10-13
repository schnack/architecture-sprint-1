const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

module.exports = {
    entry: './src/index',
    mode: 'development',
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 3001,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, HEAD, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        },
    },
    output: {
        publicPath: 'auto',
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        alias: {
            'shared-context_shared-library': path.resolve(__dirname, '../shared-library'),
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "host_microfrontend",
            remotes: {
                auth_microfrontend: "auth_microfrontend@http://localhost:3002/remoteEntry.js",
                main_microfrontend: "main_microfrontend@http://localhost:3003/remoteEntry.js",
            },
            shared: {
                react: {singleton: true},
                "react-dom": {singleton: true},
                'react-router-dom': { singleton: true },
                'shared-context_shared-library': {
                    import: 'shared-context_shared-library',
                    requiredVersion: require('../shared-library/package.json').version,
                },
            },
        }),
        new ExternalTemplateRemotesPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};
