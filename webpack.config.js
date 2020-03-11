module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname,
    filename: 'main.js',
    libraryTarget: 'commonjs2'
  },
  devtool: 'none',
  externals: {
    uxp: 'uxp',
    application: 'application',
    clipboard: 'clipboard',
    commands: 'commands'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'transform-loader?brfs'
      }
    ]
  },
  node: { fs: 'empty' }
}
