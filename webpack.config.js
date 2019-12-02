const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   mode: 'development',
   entry: path.join(__dirname, '/src/index.ts'),
   devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist',
   },
   plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        title: 'Table app',
        template: 'src/index.html'
    }),
    new CopyPlugin([
        { from: 'assets', to: 'dest' },
    ]),
   ],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
};
