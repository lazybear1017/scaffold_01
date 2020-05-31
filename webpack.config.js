const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 每次打包前清空dist文件夹
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log(process.env.NODE_ENV)

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
                    },
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.css$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ]
            },
            {
                test: /\.js$/,
                use: [{
                     loader: 'babel-loader'
                }],
                exclude: /node_modules/
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
            filename:  'css/[name].[hash:8].css', // 入口css文件名
            chunkFilename: 'public/css/[id].[hash:8].chunk.css' // 非入口css文件名
        }),
    ],
    devServer:{
        port:8080,      
        open:true,      
        hot:true,       
        overlay:true,
        historyApiFallback:true
    },
    mode:'development'//模式配置
}