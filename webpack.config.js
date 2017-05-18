const path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/script.js',
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/playground/js'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'playground'),
    port: 9001
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader'
      },
      {
        include: path.resolve(__dirname, 'src'),
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ]
      }
    ]
  }
};
