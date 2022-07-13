const webpack = require("webpack");
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.yaml$/,
        use: [{ loader: 'file-loader'}]
      },
    ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
});
