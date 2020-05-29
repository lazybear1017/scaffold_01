const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');    // 拆分CSS

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
               use:ExtractTextWebpackPlugin.extract({
                   // 将css用link的方式引入就不再需要style-loader了
                   fallback:'style-loader',
                   use:['css-loader','less-loader']
               })
            },
            {
                test: /\.css$/,     // 解析css
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader']
                })
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
        new ExtractTextWebpackPlugin('css/style.css')
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