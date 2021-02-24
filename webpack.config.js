
const path = require("path");

module.exports = {
  mode: "development", // this will trigger some webpack default stuffs for dev
  entry: "./index.js", // if not set, default path to './src/index.js'. Accepts an object with multiple key-value pairs, with key as your custom bundle filename(substituting the [name]), and value as the corresponding file path
  output: {
    filename: "app.js", // [name] will take whatever the input filename is. defaults to 'main' if only a single entry value
    path: path.resolve(__dirname, "dist") // the folder containing you final dist/build files. Default to './dist'
  },
  devtool: "source-map", // a sourcemap type. map to original source with line number
  resolve: {
    fallback: { "querystring": require.resolve("querystring-es3") }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8000,
  },
};