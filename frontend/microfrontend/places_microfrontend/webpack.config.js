const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
    entry: './src/index',
    mode: 'development',
    devServer: {
        static: path.join(__dirname, 'public'),
        port: 3005,
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
        // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
        new ModuleFederationPlugin({
            name: 'places_microfrontend',
            filename: 'remoteEntry.js',
            exposes: {
                './Places': './src/components/Places',
            },
            shared: { react: { singleton: true }, 'react-dom': { singleton: true }, 'react-router-dom': { singleton: true }},
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};
