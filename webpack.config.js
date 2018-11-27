const path = require("path");
const Dotenv = require('dotenv-webpack');


module.exports = {
  entry: './index.js',
  target: 'web',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  plugins: [ new Dotenv()],
  resolve: {
    extensions: [
      ".js",
      ".json",
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude:/node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
    ]
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  watch: true,
  node: {
   fs: "empty"
 },
};
