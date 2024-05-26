const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [
    "core-js/modules/es.array.iterator",
    "core-js/stable/symbol",
    "core-js/stable/object",
    "./src/index.tsx",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  target: ["browserslist"],
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/i,
        type: "asset/inline",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: ["node_modules"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      manifest: "./public/manifest.json",
      favicon: "./public/favicon.ico",
    }),
  ],
};
