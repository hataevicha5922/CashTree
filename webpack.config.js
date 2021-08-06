const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new HTMLWebpackPlugin({
      filename: 'sign-in.html',
      template: './src/components/sign-in/sign-in.html',
    }),
    new HTMLWebpackPlugin({
      filename: 'sign-up.html',
      template: './src/components/sign-up/sign-up.html',
    }),
    new HTMLWebpackPlugin({
      filename: 'main-page.html',
      template: './src/components/main-page/main-page.html',
    }),
    new HTMLWebpackPlugin({
      filename: 'income.html',
      template: './src/components/income/income.html',
    }),
    new HTMLWebpackPlugin({
      filename: 'expenses.html',
      template: './src/components/expenses/expenses.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 4200,
  },
};
