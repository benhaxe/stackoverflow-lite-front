const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ImageminWebpackPlugin } = require('imagemin-webpack');
const webpack = require('webpack');
const path = require('path');
const imageminGifSicle = require('imagemin-gifsicle');
const imageminJegtran = require('imagemin-jpegtran');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');

const plugins = [
  imageminGifSicle,
  imageminJegtran,
  imageminOptipng,
  imageminSvgo,
];

module.exports = {
  entry: [
    '@babel/polyfill',
    `${__dirname}/src/index.js`,
    './src/styles/style.scss',
  ],
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  mode: 'development',
  devServer: {
    contentBase: './src/public',
    port: 9000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [/node_modules/],
      },
      {
        exclude: path.resolve(__dirname, '/src/styles'),
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true,
            },
          },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.html/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        exclude: path.resolve(__dirname, '/src/styles'),
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/public/index.html`,
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/login/login.html`,
      hash: true,
      title: 'Stackoverflow Clone',
      filename: './dist/login.html',
      baseUrl: 'localhost:9000/login',
      myPageHeader: 'Login',
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/signin/signin.html`,
      hash: true,
      title: 'Stackoverflow Clone',
      filename: './dist/signin.html',
      myPageHeader: 'Signin',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id]'.css,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin(),
    new ImageminWebpackPlugin({
      imageminOptions: {
        plugins,
      },
    }),
  ],
};
