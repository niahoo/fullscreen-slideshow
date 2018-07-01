const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const bubleLoader = {
    loader: 'buble-loader',
    options: {
        objectAssign: 'Object.assign'
    }
}

module.exports = {
    entry: {
        bundle: ['.\\src\\main.js']
    },
    resolve: {
        extensions: ['.js', '.html']
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        chunkFilename: '[name].[id].js'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [{
            test: /\.html$/,
            exclude: /node_modules/,
            use: [{
                    loader: 'svelte-loader',
                    options: {
                        skipIntroByDefault: true,
                        nestedTransitions: true,
                        emitCss: true,
                        hotReload: true
                    }
                }
            ]
        }, {
            test: /\.css$/,
            use: [
                /**
                 * MiniCssExtractPlugin doesn't support HMR.
                 * For developing, use 'style-loader' instead.
                 * */
                prod ? MiniCssExtractPlugin.loader : 'style-loader',
                'css-loader'
            ]
        }]
    },
    mode,
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    devtool: prod ? false : 'source-map'
};
