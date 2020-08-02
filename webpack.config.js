const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const SRC_PATH = path.resolve(__dirname, "examples");
const BUILD_PATH = path.resolve(__dirname, "examples-build");

module.exports = {
  stats: "minimal",
  target: "web",
  entry: path.join(SRC_PATH, "index.tsx"),
  output: {
    path: BUILD_PATH,
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC_PATH, "index.html"),
      filename: "index.html",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  devtool: "source-map",
};
