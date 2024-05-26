const Dotenv = require("dotenv-webpack");
const { merge } = require("webpack-merge");
const path = require("path");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-source-map",
  plugins: [
    new Dotenv({
      path: path.resolve(process.cwd(), ".env"),
      safe: true,
    }),
  ],
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
    },
    static: {
      directory: path.join(__dirname, "../dist"),
    },
    liveReload: true,
    hot: false,
    compress: true,
    port: 3000,
    host: "localhost",
  },
});
