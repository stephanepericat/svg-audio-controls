const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "SVG Audio Controls",
      template: "index.html"
    }),
    new CopyWebpackPlugin([{ from: "public" }])
  ],
  devServer: {
    open: true,
    contentBase: path.join(__dirname, "public")
  }
};
