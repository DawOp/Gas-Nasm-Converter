const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './scripts/index.js',
    mode: 'development',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000
    },
    
    module: {
        rules: [
            { 
                test: /\.css$/, 
                use: [
                    'style-loader',
                    'css-loader'
                ] 
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CleanWebpackPlugin(),
    ]
};