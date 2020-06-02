const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'
console.log(process.env.NODE_ENV)

module.exports = {
  entry: {
    index: './src/index.js',
    detail: './src/detail.js'
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve('dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // development环境启用hmr
              hmr: devMode,
              // if hmr does not work, this is a forceful method.
              reloadAll: true
            }
          },
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // development环境启用hmr
              hmr: devMode,
              // 如果hmr不工作，这是一个强有力的方法
              reloadAll: true
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader'
            // options: {
            //   fix: false,
            //   emitError: false,
            //   emitWarning: true
            // //   formatter: 'eslint/lib/cli-engine/formatters/codeframe'
            // }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              publicPath: '/dist/images',
              name: '[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'test',
      dateData: new Date(),
      template: './public/index.html',
      filename: 'index.html',
      hash: true, // 打包后的bundle.js后面会加上hash串
      chunks: ['index'] // 对应关系 index.index.html
      // minify: {
      //   removeComments: true, // 删除注释
      //   collapseWhitespace: true// 删除空格
      // }
    }),
    new HtmlWebpackPlugin({
      template: './public/detail.html',
      filename: 'detail.html',
      chunks: ['detail'] // 对应关系 detail.detail.html
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    }),
    new webpack.HotModuleReplacementPlugin()
    // new FriendlyErrorsWebpackPlugin(
    //   {
    //     compilationSuccessInfo: {
    //       messages: [
    //         '你的应用程序运行在: http://localhost:8081/'
    //       ],
    //       notes: [
    //         '你也能够使用下面地址访问: \n\n    http://192.168.0.145:8081/\n    http://127.0.0.1:8081/\n'
    //       ]
    //     },
    //     onErrors: function () { /* omitted long function */ },
    //     clearConsole: true
    //   }
    // )
  ],
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    quiet: true,
    overlay: true,
    historyApiFallback: true
  },
  devtool: 'source-map',
  mode: 'development'
}
