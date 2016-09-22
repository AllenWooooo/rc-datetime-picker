import webpack from 'webpack';
import path from 'path';
import minimist from 'minimist';


let env = minimist(process.argv.slice(2)).ENV;

let config = {
  devtool: 'eval',
  entry: {
    app: ['./docs/app.jsx']
  },
  output: {
    path: path.resolve(__dirname, './docs'),
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
        test: /\.(jsx|js)$/,
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

if (env === 'development') {
  config.entry.app.unshift('webpack/hot/only-dev-server');
}


export default config;
