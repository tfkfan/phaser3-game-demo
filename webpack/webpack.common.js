const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const utils = require('./utils.js');
const environment = require('./environment');

const getTsLoaderRule = env => {
    const rules = [
        {
            loader: 'thread-loader',
            options: {
                // There should be 1 cpu for the fork-ts-checker-webpack-plugin.
                // The value may need to be adjusted (e.g. to 1) in some CI environments,
                // as cpus() may report more cores than what are available to the build.
                workers: require('os').cpus().length - 1,
            },
        },
        {
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
                happyPackMode: true,
            },
        },
    ];
    return rules;
};

module.exports = async options => {
    const development = options.env === 'development';
    return merge(
        {
            cache: {
                // 1. Set cache type to filesystem
                type: 'filesystem',
                cacheDirectory: path.resolve(__dirname, '../build/webpack'),
                buildDependencies: {
                    // 2. Add your config as buildDependency to get cache invalidation on config change
                    config: [
                        __filename,
                        path.resolve(__dirname, `webpack.${development ? 'dev' : 'prod'}.js`),
                        path.resolve(__dirname, 'environment.js'),
                        path.resolve(__dirname, 'utils.js'),
                        path.resolve(__dirname, '../postcss.config.js'),
                        path.resolve(__dirname, '../tsconfig.json'),
                    ],
                },
            },
            resolve: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
                modules: ['node_modules'],
                alias: utils.mapTypescriptAliasToWebpackAlias(),
                fallback: {
                    path: require.resolve('path'),
                },
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: getTsLoaderRule(options.env),
                        include: [utils.root('./src')],
                        exclude: [utils.root('node_modules')],
                    },
                    {
                        enforce: 'pre',
                        test: /\.jsx?$/,
                        loader: 'source-map-loader'
                    }
                ],
            },
            stats: {
                children: false,
            },
            plugins: [
                new webpack.EnvironmentPlugin({
                    LOG_LEVEL: development ? 'info' : 'error',
                }),
                new webpack.DefinePlugin({
                    DEVELOPMENT: JSON.stringify(development),
                    SERVER_API_URL: JSON.stringify(environment.SERVER_API_URL)
                }),
                new ESLintPlugin({
                    extensions: ['js', 'ts', 'jsx', 'tsx'],
                }),
                new ForkTsCheckerWebpackPlugin(),
                new CopyWebpackPlugin({
                    patterns: [
                        {from: './assets/', to: 'assets/' }
                    ],
                }),
                new HtmlWebpackPlugin({
                    template: './src/index.html',
                    chunksSortMode: 'auto',
                    inject: 'body',
                }),
            ],
        }
    );
};
