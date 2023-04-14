module.exports = {
    module: {
      rules: [
        {
          test: /\.m?js$/,
          include: /node_modules\/firebase-admin/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      ]
    }
  }
  