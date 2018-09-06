var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin([
      { from: 'index.html' },
      { from: 'favicon.ico' },
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader', options: {
            javascriptEnabled: true
          }
        }]
      },
      {
        test: /\.svg$/,
        loader: "url-loader?mimetype=image/svg+xml"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"],
  }
};
