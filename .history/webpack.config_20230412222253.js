module.exports = {
    
    externals: [ 'aws-sdk', 'commonjs2 firebase-admin' ],
    module: {
      rules: [
        {
          test: /\.node$/,
          loader: "node-loader"
        }
      ]
    }
    
  };