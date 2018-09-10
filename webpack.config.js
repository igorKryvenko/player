const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ['./src/js/player.js', './src/sass/main.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

    module: {
    rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                modules: false
              }],
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          }
        }
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: './[name].bundle.css',
      allChunks: true
    })
  ]
};
