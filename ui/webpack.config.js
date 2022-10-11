 const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const generateHtmlPlugin = (title) => {
  const moduleName = title.toLowerCase();
  
  return new htmlWebpackPlugin({
    title,
    filename: `${moduleName}.html`,
    template: `./index.html`,
    chunks: [moduleName]
  });
}

const populateHtmlPlugins = (pagesArray) => {
  res = [];
  pagesArray.forEach(page => {
    res.push(generateHtmlPlugin(page));
  })
  return res;
}

const pages = populateHtmlPlugins(["Index", "Settings"]);

module.exports = {
  mode: 'production',
  entry: {
      index : __dirname + "/src/index.js",
      settings : __dirname + "/src/settings.js"
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
       },
     },
  },
  plugins: [
    ...pages,
    new MiniCssExtractPlugin({
      filename: "app.css",
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
}