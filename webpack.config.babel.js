import path from 'path';
import {argv} from 'yargs';


const env = argv.env;
const config = {
  devtool: 'eval',
  entry: {
    app: ['./docs/app.jsx']
  },
  output: {
    path: path.resolve(__dirname, './docs'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          'eslint-loader'
        ]
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(less|css)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
};

if (env === 'development') {
  config.entry.app.unshift('webpack/hot/only-dev-server');
}


export default config;
