const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const SRC_PATH = path.resolve(__dirname, "examples");
const BUILD_PATH = path.resolve(__dirname, "examples-build");

module.exports = {
  stats: "minimal",
  target: "web",
  entry: ["react-hot-loader/patch", path.join(SRC_PATH, "index.tsx")],
  output: {
    path: BUILD_PATH,
    filename: "[name].[hash].js",
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
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
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
