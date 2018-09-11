var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin([
      { from: 'index.html' },
      { from: 'favicon.ico' },
      { from: 'lib/jquery-3.3.1.min.js' },
      { from: 'lib/jquery.firefly-0.7.min.js' },
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
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
        }]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"],
  }
};
