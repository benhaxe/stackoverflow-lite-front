const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    `${__dirname}/src/index.js`,
    `${__dirname}/src/login/login.js`,
    `${__dirname}/src/signin/signin.js`,
  ],
  output: {
    filename: 'bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/public/index.html`,
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/login/login.html`,
      hash: true,
      title: 'Stackoverflow Clone',
      filename: 'login.html',
      myPageHeader: 'Login',
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/signin/signin.html`,
      hash: true,
      title: 'Stackoverflow Clone',
      filename: 'signin.html',
      myPageHeader: 'Signin',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id]'.css,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
};
