var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSass = new ExtractTextPlugin({
  filename: "dist/bundle.css",
  allChunks: true,
});

module.exports = {
  entry: ['./src/js/app.js', './src/scss/main.scss'],
  output: {
    filename: 'dist/bundle.js'
  },
  module: {

    rules: [{
      test: /\.(scss)$/,
      use: extractSass.extract({
              use: [
                {loader: "css-loader"}, 
                {loader: "postcss-loader", options:{
                  plugins: function () {
                    return [require('precss'), require('autoprefixer')];
                  }
                }}, 
                {loader: "sass-loader"}
           ]})
    }]
  },
  plugins: [
  extractSass,
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    Popper: ['popper.js', 'default']
  })
  ],
};