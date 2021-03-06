var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: process.argv.indexOf('-p') > -1 ? 'siribro.min.js' : 'siribro.js',
    path: path.join(__dirname, 'dist'),
    library: 'siribro',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.html/,
        use: 'raw-loader'
      }
    ]
  }
};
