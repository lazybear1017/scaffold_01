const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 每次打包前清空dist文件夹
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    entry:{
        index:'./src/index.js',
        detail:'./src/detail.js'
    },
    output:{
        filename:'[name].js',
        path:path.resolve('dist')
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          // development环境启用hmr
                          hmr: devMode,
                          // if hmr does not work, this is a forceful method.
                          reloadAll: true,
                        },
                      },
                    'css-loader',
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
                      reloadAll: true,
                    },
                  },
                  'css-loader',
                ],
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
                            publicPath : '/dist/images',
                            name: '[name].[hash:8].[ext]'
                        }
                     }
                   ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            filename:'index.html',
            hash:true,//打包后的bundle.js后面会加上hash串
            chunks:['index']//对应关系 index.index.html
        }),
        new HtmlWebpackPlugin({
            template:'./public/detail.html',
            filename:'detail.html',
            chunks:['detail']//对应关系 detail.detail.html
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        }),
    ],
    devServer:{
        port:8080,      
        open:true,      
        hot:true,       
        overlay:true,
        historyApiFallback:true
    },
    devtool: 'source-map',
    mode:'development'
}