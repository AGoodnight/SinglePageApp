const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode:"development",
    entry:"./main.js",
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"[name].js",
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude:/node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
            },
            {
                test: /\.html$/i,
                exclude:[/node_modules/,path.resolve(__dirname,'index.html')],
                loader: 'raw-loader',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:"Weather App",
            template: 'index.html',
            inject: 'head'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new CopyWebpackPlugin({
            patterns:[
            {
              from: './app/templates',
              to: 'templates',
            },
        ]}),
    ],
    devServer: {
        proxy: { // proxy URLs to backend development server
          '/api': 'http://localhost:3000'
        },
        port: 4200,
        contentBase: path.join(__dirname, 'dist'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        // ...
    },
}