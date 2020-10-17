const HtmlWebPackPlugin              = require('html-webpack-plugin');
const MiniCssExtractPlugin           = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin                   = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin }         = require('clean-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production', 
    optimization: {
        minimizer: [ new OptimizeCssAssetsWebpackPlugin() ]
    }, 
    output: {
        filename: 'main.[contenthash].js'
    }, 
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                    presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/, 
                exclude: /styles\.css$/, 
                use: [
                    'style-loader', 
                    'css-loader'
                ]
            }, 
            {
                test: /styles\.css$/, 
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false, 
                    minimize: false
                }, 
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    }, 
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html', 
            filename: './index.html'
        }), 
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css', 
            ingnoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ]
        }), 
        new MinifyPlugin(), 
        new CleanWebpackPlugin(),
    ]

}

