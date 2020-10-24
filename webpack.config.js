const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
            ],
    },
    
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
         disableHostCheck: true
    },
    
    plugins: [
    new CopyWebpackPlugin({
          patterns: [
                    {from: path.resolve(__dirname, 'index.html'),
                    to: path.resolve(__dirname, 'dist')}
              ]
      })
  ]
}

  