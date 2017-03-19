var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: process.argv.indexOf('-p') > -1 ? 'siribro.min.js' : 'siribro.js',
    path: path.join(__dirname, 'dist'),
    library: 'siribro',
    libraryTarget: 'umd'
  }
};
