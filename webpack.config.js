const path = require("path");
// noinspection JSUnresolvedVariable
module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/main.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader?presets=es2015!xola-style-loader!xola-template-loader"
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader?strictMath&noIeCompat"
      },
      {
        test: /\.njk$/,
        loader: "nunjucks-loader"
      }
    ]
  },
  devtool: "source-map",
  devServer: {
    inline: true
  }
};
