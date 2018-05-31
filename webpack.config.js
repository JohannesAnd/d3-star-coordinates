const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: './client/index.js',
    module: {
      rules: [{ test: /\.js$/, use: 'babel-loader' }]
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: './index.template.html',
        title: 'Star Coordinates in 2D',
        language: 'no'
      })
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    }
  };
};
