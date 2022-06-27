const webpackNodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
    target: 'node',
    mode: 'production',
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        library: {
            type: 'umd',
        },
    },
    externalsPresets: {
        node: true,
    },
    externals: [webpackNodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
};
