import webpack from 'webpack';


let config = {
  devtool: 'eval',
  entry: {
    app: ['webpack/hot/only-dev-server', './example/app.jsx']
  },
  output: {
    path: __dirname,
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
