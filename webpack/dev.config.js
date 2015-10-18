import path from 'path';
import webpack from 'webpack';

const port = 3000;
const entry = [
  `webpack-dev-server/client?https://localhost:${port}`,
  'webpack/hot/only-dev-server'
];

export default {
  devtool: 'inline-source-map',
  entry: {
    background: [ path.join(__dirname, '../chrome/app/background/index'), ...entry ]
  },
  output: {
    path: path.join(__dirname, '../dev/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    publicPath: `https://localhost:${port}/js/`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true
    })
  ],
  resolve: {
    extensions: ['', '.es', '.js']
  },
  module: {
    loaders: [{
      test: /\.es$/,
      loaders: ['babel'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loaders: ['style', 'raw']
    }]
  }
};
