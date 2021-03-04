const path = require('path');
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
var HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
module.exports = {
    mode,
    // devtool: 'source-map',
    entry: {
        main: './src/index.jsx',
        //tapable:'./tapableTest/index.jsx',
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./dist'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions:{
                                plugins:[
                                    [
                                       "autoprefixer",{
                                        broswers: ['last 5 versions', '> 0.05%'],
                                        remove: false,
                                       } 
                                    ],
                                    // ["postcss-preset-env"]
                                ]
                            },
                        },
                    }

                ]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve('./template/index.html')
    })],
    optimization: {
        //minimize: true,
        // minimizer: [
        //     new UglifyJsPlugin(),
        //     // new Analyzer(),
        // ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    devServer: {
        contentBase: false,
        compress: true,
        inline: true,
        hot: true,
        open: true,
    }
}