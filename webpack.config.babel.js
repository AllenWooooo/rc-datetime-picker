import webpack from 'webpack';
import path from 'path';


let config = {
  devtool: 'eval',
  entry: {
    app: ['webpack/hot/only-dev-server', './example/app.jsx']
  },
  output: {
    path: path.resolve(__dirname, './example'),
    filename: 'app.js'
  },
  module: {
    preloaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.(less|css)$/,
        exclude: /node_modules/,
        loader: 'style!css!less'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  }
};


export default config;
