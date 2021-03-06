const path = require("path");
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'production',
    entry : path.resolve('./src/index.js'),
    output : {
        library: 'ui-vue',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.html'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': path.resolve(__dirname, "./src"),
          'common': path.resolve(__dirname, "./src/common"),
          'components': path.resolve(__dirname, "./src/components"),
          'config': path.resolve(__dirname, "./src/config"),
        }
      },
    plugins : [
        new MiniCssExtractPlugin({
          filename: 'index.css'
        }),
        new OptimizeCssAssetsPlugin(),
        new CleanWebpackPlugin(
          ['dist/',],
          {
              root: __dirname,
              verbose:  false,
              dry:      false
          }
        ),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"'
          }
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            },
            include: path.resolve(__dirname, "./src"),
            exclude: /(node_modules|bower_components)/,
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
            use: 'url-loader?limit=50000',
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
            }
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
            }
          },
          {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
          }
        ]
    }
}
