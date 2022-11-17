module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react'
          ]
        }
      }
    ]
  }
}
//IMPORTANT FOR GOOGLE AUTHENTICATION:

//ClientID: 53771139103-07bg91j6j0tt69k4n60b374sd0ugpm4g.apps.googleusercontent.com
//Client Secret: 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
