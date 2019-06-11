const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].js', //最终会打包成app.js app为entry选项的key值
    path: __dirname + '/dist' //最终会在当前文件夹下创建一个dist目录，下面有app.js
  },
  plugins: [//是一个数组
    new webpack.optimize.UglifyJsPlugin(), //压缩app.js的中间件
    new HtmlWebpackPlugin({
      template: 'index.html' //路径的写法相对于webpack.config.js目录    //把index.html自动给复制到dist目录下，并且自动引入。
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.stylus$/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 图片的大小，如果背景图片无法显示，需要调整大小，大小约为不到10M
          name: path.posix.join('static','img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 媒体文件的大小
          name: path.posix.join('static', 'media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 字体文件的大小
          name: path.posix.join('static', 'fonts/[name].[hash:7].[ext]')
        }
      }   
    ]
  },
  resolve: {
    extensions: ['.js', '.css', '.less', '.stylus', '.scss'], // 说明引入的文件可以省略的后缀名 --- 缺省的后缀名,如果遇到前缀相同，后缀不同的文件，以第一个出现的为准
    alias: { // 别名的设置    src的文件目录设置为@
      '@': path.join(__dirname, './', 'src')
    }
  }
}
