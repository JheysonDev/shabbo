/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');

    // Load .env configuration.
    dotenv.config();
}

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './src/Index.ts',
    mode: isDevelopment ? 'development' : 'production',
    output: {
        filename: `[name].${isDevelopment ? '[contenthash]' : 'min'}.js`,
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            buffer: false,
            timers: false,
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: true,
        minimizer: [],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jp(e)?g|gif)$/,
                loader: 'file-loader',
                options: {
                    name: `images/[name]${isDevelopment ? '.[contenthash]' : ''}.[ext]`,
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: `fonts/[name]${isDevelopment ? '.[contenthash]' : ''}.[ext]`,
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebPackPlugin({
            template: './public/index.html',
            filename: './index.html',
            //favicon: './public/favicon.ico',
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        contentBasePublicPath: '/',
        host: process.env.HOST || '127.0.0.1',
        port: process.env.PORT || 3000,
        compress: true,
        historyApiFallback: true,
        open: true,
    },
};
