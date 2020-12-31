const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const EnvironmentPlugin = require('webpack').EnvironmentPlugin;

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
        alias: {
            '@Assets': path.resolve(__dirname, './src/assets/'),
            '@Communication': path.resolve(__dirname, './src/communication/'),
            '@HabboHotel': path.resolve(__dirname, './src/HabboHotel/'),
            '@Pages': path.resolve(__dirname, './src/pages/'),
            '@SHabbo': path.resolve(__dirname, './src/SHabbo.ts'),
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
        new EnvironmentPlugin({
            API_URL: process.env.API_URL || 'http://localhost:5000/',
        }),
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
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000,
        compress: true,
        historyApiFallback: true,
        open: true,
    },
};
